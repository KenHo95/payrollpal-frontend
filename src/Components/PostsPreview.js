import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import { TikTok } from "react-tiktok";

const PostsPreview = (props) => {
  const [postsURL, setpostsURL] = useState([]);
  const [open, setOpen] = useState(false);

  const getPostURL = async () => {
    let res = [];
    res = await axios.get(`${BACKEND_URL}/posts/preview/${props.contract_id}`);
    setpostsURL(res.data);
  };

  useEffect(() => {
    getPostURL();
    return;
  }, [props.toggleGetPostPreview, props.toggleGetContract]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const content = postsURL.map((postsURL, ind) => (
    <div key={ind}>
      {/* Posts: */}
      <a href={postsURL.post_url} target="_blank" rel="noopener noreferrer">
        {`Post ${ind + 1}`}
      </a>
      <p>{postsURL.description}</p>
      <TikTok url={postsURL.post_url} />
      <em>Post may take up to 5 seconds to load</em>
      <br />
    </div>
  ));

  return (
    <div>
      <Button onClick={handleClickOpen}>Preview</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="contract-preview-title"
        aria-describedby="contract-preview-description"
      >
        <DialogTitle id="contract-preview-title">Preview</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostsPreview;
