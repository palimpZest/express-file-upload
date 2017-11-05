var express = require('express');
var router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/monupload', function (req, res, next) {
  res.render('upload-fichier');
});

router.post('/monupload', upload.array('monfichier', 10), function(req, res, next) {
  console.log(req.files);
  req.files.forEach(function(image) {
    if (image.size > (3*1024*1024) ) {
      res.send('Vous ne pouvez pas uploader des fichiers de plus de 30mo !');
    } else if (image.size < (3*1024*1024) && (image.mimetype !== 'image/png') ) {
      res.send('Vous ne pouvez uploader que des fichiers png !');
    } else if (image.size < (3*1024*1024) && (image.mimetype === 'image/png') ) {
      fs.rename(image.path, 'public/images/' + image.originalname);
      res.send('Fichier(s) uploadé(s) avec succès');
    } else  {
      res.send('problème durant le chargement');
    }
  })
});

module.exports = router;


// Code to upload only one file:

// router.post('/monupload', upload.single('monfichier'), function(req, res, next) {
//   console.log(req.file);
//   if (req.file.size < (3*1024*1024) && (req.file.mimetype == 'image/png') ) {
//     fs.rename(req.file.path, 'public/images/' + req.file.originalname);
//     res.send('Fichier uploadé avec succès');
//   } else {
//     res.send('problème durant le chargement');
//   }
// });
