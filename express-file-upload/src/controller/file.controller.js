const uploadFile = require("../middleware/upload");
const uploadFiles = require("../middleware/uploadfiles");
const fs = require("fs");
const path = require("path");
const baseUrl = "http://localhost:8080/files/";

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    if(req.file.originalname) {
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    }
  } catch (err) {
    //console.log("sfsfsf",err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 10MB!",
      });
    }

    return res.status(500).send({
      message: err,
    });
  }
};

const uploadMultFiles = async (req, res) => {
  //console.log(req.files)
  //if (req.files.length == 1 && req.files.length <= 5) {
    try {
      await uploadFiles(req, res);
  
      if (req.files == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      if(req.files) {
        res.status(200).send({
          message: "Uploaded the files successfully: " + req.files,
        });
      }
    } catch (err) {
      //console.log("sfsfsf",err);
      if (err.code == "LIMIT_UNEXPECTED_FILE") {
        return res.status(500).send({
          message: "Max 5 files allwed",
        });
      }
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 10MB!",
        });
      }
  
      return res.status(500).send({
        message: err,
      });
    }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const remove = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/uploads/";

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });
};

const removeSync = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/uploads/";

  try {
    fs.unlinkSync(directoryPath + fileName);

    res.status(200).send({
      message: "File is deleted.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
};

module.exports = {
  upload,
  uploadMultFiles,
  getListFiles,
  download,
  remove,
  removeSync,
};
