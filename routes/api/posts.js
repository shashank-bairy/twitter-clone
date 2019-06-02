const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// validation
const validatePostInput = require('../../validation/post');

// @route GET api/posts
// @desc Get posts
// @access Public
router.get('/', (req, res, next) => {
  Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({nopostsfound: 'No posts were found'}));
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(() => res.status(404).json({nopostfound: 'No post found with that ID'}));
});

// @route POST api/posts
// @desc Create posts
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const { errors , isValid } = validatePostInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({user: req.user._id})
    .then(profile => {
      if(!profile) {
        errors.profileNotFound = 'Profile not created for user. Please create one';
        return res.status(404).json(errors);
      }
      
      const newPost = new Post({
        user: req.user._id,
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        handle: profile.handle
      });
    
      newPost
        .save()
        .then(post => res.status(200).json(post))
        .catch(() => {
          errors.internalError = 'The server met an unexpected condition';
          res.status(500).json(errors);
        });
    })
    .catch(() => {
      errors.internalError = 'The server met an unexpected condition';
      res.status(500).json(errors);
    });
});

// @route DELETE api/posts/:id
// @desc Delete the post
// @access Private

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const errors = {};
  const status = {};
  Profile.findOne({user: req.user._id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check fot post owner
          if(post.user.toString() !== req.user._id.toString()) {
            errors.notauthorised = 'User not authorised';
            return res.status(401).json(errors);
          }

          if(post.isretweet.value) {
            Post.findById(post.isretweet.post)
              .then(parentPost => {
                  if(parentPost) {
                    const removeIndex = parentPost.retweet
                      .map(rt => rt.user.toString())
                      .indexOf(req.user._id.toString());
                    
                    parentPost.retweet.splice(removeIndex, 1);
                    parentPost.count.retweet = parentPost.count.retweet - 1;

                    parentPost
                      .save()
                      .then(() => status.retweetReference = 'Retweet reference deleted!')
                      .catch((err) => console.log(err))
                  }
              })
              .catch(err => console.log(err));              
          }

          // Delete
          post.remove()
            .then(()=> res.status(200).json({ success: true }));
        })
        .catch(()=> {
          errors.postnotfound = 'No post found'; 
          res.status(404).json(errors);
        })
    })    
});

// @route POST api/posts/like/:id
// @desc Like post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const errors = {};
  Profile.findOne({ user: req.user._id }) 
    .then(profile => {
      if(profile) {
        Post.findById(req.params.id)
          .then(post => {
            if(!post) {
              errors.postNotFound = 'Post with that ID was not found';
              return res.status(404).json(errors);
            }
            if(post.likes.filter(like => like.user.toString() === req.user._id.toString()).length > 0) {
              errors.postAlreadyLiked = 'Post already liked by the user';
              return res.status(400).json(errors);
            }
            
            post.count.likes = post.count.likes + 1;
            post.likes.unshift({ user: req.user._id });
            post
              .save()
              .then(post => res.status(200).json(post))
              .catch(() => {
                errors.internalError = 'The server met an unexpected condition';
                res.status(500).json(errors);
              });
          })
      }
    })
    .catch(() => {
      errors.internalError = 'The server met an unexpected condition';
      res.status(500).json(errors);
    });
});

// @route POST api/posts/unlike/:id
// @desc unlike post
// @access Private
router.post('/unlike/:id',passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const errors = {};
  Profile.findOne({ user: req.user._id }) 
    .then(profile => {
      if(profile) {
        Post.findById(req.params.id)
          .then(post => {
            if(!post) {
              errors.postNotFound = 'Post with that ID was not found';
              return res.status(404).json(errors);
            }
            if(post.likes.filter(like => like.user.toString() === req.user._id.toString()).length === 0) {
              errors.postAlreadyLiked = 'Post already unliked by the user';
              return res.status(400).json(errors);
            }
            
            const removeIndex = post.likes
              .map(like => like.user.toString())
              .indexOf(req.user._id.toString());
            
            post.likes.splice(removeIndex, 1);
            post.count.likes = post.count.likes - 1;

            // Save changes to post
            post
              .save()
              .then(post => res.status(200).json(post))
              .catch(() => {
                errors.internalError = 'The server met an unexpected condition';
                res.status(500).json(errors);
              });
          })
      }
    })
    .catch(() => {
      errors.internalError = 'The server met an unexpected condition';
      res.status(500).json(errors);
    });
});

// @route POST api/posts/comment/:id
// @desc Comment on post
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const { errors , isValid } = validatePostInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }
  Post.findById(req.params.id)
    .then(post => {
      if(!post) {
        errors.postNotFound = 'Post with that ID was not found';
        return res.status(404).json(errors);
      }
      
      Profile.findOne({user: req.user._id})
        .then(profile => {
          if(!profile) {
            errors.profileNotFound = 'Profile not created for user. Please create one';
            return res.status(404).json(errors);
          }
          post.count.comments = post.count.comments + 1;
          const newComment = {
            user: req.user._id,
            name: req.user.name,
            avatar: req.user.avatar,
            handle: profile.handle,
            text: req.body.text,
            date: Date.now()
          };
          post.comments.unshift(newComment);
          post
            .save()
            .then(post => res.status(200).json(post))
            .catch(() => {
              errors.internalError = 'The server met an unexpected condition';
              res.status(500).json(errors);
            });
        })
        .catch(() => {
          errors.internalError = 'The server met an unexpected condition';
          res.status(500).json(errors);
        });
    })
});

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment on post
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const errors = {};
  Post.findById(req.params.id)
    .then(post => {
      if(!post) {
        errors.postNotFound = 'Post with that ID was not found';
        return res.status(404).json(errors);
      }
     
      const removeIndex = post.comments
        .map(comment => comment._id.toString())
        .indexOf(req.params.comment_id);
      
      post.comments.splice(removeIndex, 1);
      post.count.comments = post.count.comments - 1;

      post
        .save()
        .then(post => res.status(200).json(post))
        .catch(() => {
          errors.internalError = 'The server met an unexpected condition';
          res.status(500).json(errors);
        });
    })
});

// @route POST api/posts/retweet/:id
// @desc Retweet posts
// @access Private
router.post('/retweet/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const errors = {};
  Profile.findOne({ user: req.user._id }) 
    .then(profile => {
      if(profile) {
        Post.findById(req.params.id)
          .then(post => {
            if(!post) {
              errors.postNotFound = 'Post with that ID was not found';
              return res.status(404).json(errors);
            }
            if(post.retweet.filter(like => like.user.toString() === req.user._id.toString()).length > 0) {
              errors.postAlreadyLiked = 'Post already retweeted by the user';
              return res.status(400).json(errors);
            }
            
            post.count.retweet = post.count.retweet + 1;
            post.retweet.unshift({ user: req.user._id });
            post
              .save()
              .then(post => console.log(post))
              .catch(() => {
                errors.internalError = 'The server met an unexpected condition';
                res.status(500).json(errors);
              });

            const newPost = new Post({
              user: req.user._id,
              text: req.body.text,
              name: req.user.name,
              avatar: req.user.avatar,
              handle: profile.handle,
              isretweet: {
                value: true,
                post: post._id
              }
            });
          
            newPost
              .save()
              .then(post => res.status(200).json(post))
              .catch(() => {
                errors.internalError = 'The server met an unexpected condition';
                res.status(500).json(errors);
              });
          })
      }
    })
    .catch(() => {
      errors.internalError = 'The server met an unexpected condition';
      res.status(500).json(errors);
    });
});

module.exports = router;