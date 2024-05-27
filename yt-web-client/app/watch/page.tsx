"use client";
import React, { use } from "react";

import { useSearchParams } from "next/navigation";

const Watch = () => {
  const videoPrefix =
    "https://storage.googleapis.com/yrll-yt-processed-videos/";
  const videoSrc = useSearchParams().get("v");

  return (
    <div>
      <h1>Watch Page</h1>
      <video src={videoPrefix + videoSrc} controls />
    </div>
  );
};

export default Watch;
