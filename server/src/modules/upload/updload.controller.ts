import https from "https";
import fs from "fs";

const BASE_HOSTNAME = "storage.bunnycdn.com";
const HOSTNAME = BASE_HOSTNAME;
const ACCESS_KEY = "c7698d5c-1e4c-4ac5-98d6ea15e74b-1bb1-4fa3";
const STORAGE_ZONE_NAME = "shopleap-ecom";

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file found" });
  }
  const file = req.file;
  const filePath = file.path;
  const fileName = file.originalname;

  const readStream = fs.createReadStream(filePath);

  const options = {
    method: "PUT",
    host: HOSTNAME,
    path: `/${STORAGE_ZONE_NAME}/${fileName}`,
    headers: {
      AccessKey: ACCESS_KEY,
      "Content-Type": "application/octet-stream",
    },
  };

  const reqBunny = https.request(options, (response) => {
    response.on("data", (chunk) => {
      console.log(chunk.toString("utf8"));
    });
  });

  reqBunny.on("error", (error) => {
    console.error(error);
    fs.unlink(filePath, (err) => {
      if (err) console.log("Error removing file:", err);
    });

    res.status(500).json({
      status: false,
      message: "File upload failed",
      error: error.message,
    });
  });

  readStream.pipe(reqBunny);
  const path = `${reqBunny.path}`;
  setTimeout(() => {
    fs.rm(filePath, () => {
      console.log("File removed");
    });
  });

  res.json({
    status: true,
    message: "File uploaded successfully",
    path: path,
  });
};

export const deleteFile = async (req, res) => {
  const url = `https://${HOSTNAME}/${STORAGE_ZONE_NAME}/${req.params.fileName}`;
  const options = {
    method: "DELETE",
    headers: {
      AccessKey: ACCESS_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      res.status(200).json({
        status: true,
        message: "File deleted successfully",
      });
    } else {
      const errorText = await response.text();
      res.status(response.status).json({
        status: false,
        message: `Error in deleting file: ${errorText}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error in deleting file",
    });
  }
};
