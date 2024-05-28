"use client";
import React, { Suspense } from "react";

import { useSearchParams } from "next/navigation";

const Watch = () => {
  const videoPrefix =
    "https://storage.googleapis.com/yrll-yt-processed-videos/";
  const search = useSearchParams();
  const videoSrc = search.get("v");

  return (
    <div>
      <h1>Watch Page</h1>
      <video src={videoPrefix + videoSrc} controls />
    </div>
  );
};

export default Watch;
