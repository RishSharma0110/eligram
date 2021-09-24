const sharp = require('sharp');
const fs = require('fs');

const Post = require('./../models/post.model');

exports.getNewPost = (req, res) => {
  res.render('post/addPost', {
    user: req.user,
  });
};

exports.postNewPost = async (req, res) => {
  const image = req.file;

  if (!image) {
    return res.send('unsucessful');
  }

  const fileNameAndPath =
    'assets/user/uploads/images/' +
    Date.now() +
    image.originalname.split('.')[0] +
    '.jpg';

  await sharp(image.path)
    .resize(480, 480)
    .withMetadata()
    .toFile(fileNameAndPath);

  fs.unlink(image.path, () => {});
  const post = new Post({
    imgUrl: '/' + fileNameAndPath,
    caption: req.body.caption,
    userId: req.user._id.toString(),
  });

  const savedPost = await post.save();
  req.user.posts.push(savedPost._id.toString());
  await req.user.save();
  res.redirect('/');
};

exports.getPost = async (req, res) => {
  const postID = req.params.pid;
  try {
    const post = await Post.findById(postID);
    res.render('post/post', {
      post,
      user: req.user,
    });
  } catch (error) {
    res.render('404');
  }
};
