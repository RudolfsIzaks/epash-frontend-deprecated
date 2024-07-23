import React, { useState, useEffect, useRef } from "react";
import NavLogo from "../components/navLogo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../index.css';

function PlatformSpotify() {
  const location = useLocation();
  const navigate = useNavigate();
  const { parsedData } = location.state || {};

  const [audioIndex, setAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    audioRef.current.currentTime -= 10;
  };

  const handleSkipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const handleNextAudio = () => {
    setAudioIndex((prevIndex) => (prevIndex + 1) % parsedData.audio.length);
  };

  const handlePreviousAudio = () => {
    setAudioIndex((prevIndex) => (prevIndex - 1 + parsedData.audio.length) % parsedData.audio.length);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [audioIndex]);

  if (!parsedData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex w-full justify-between items-center py-5 px-48">
        <NavLogo />
        <div className="flex gap-3">
          <Link
            to="/dashboard/manage-campaigns"
            className="flex justify-center items-center bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100"
          >
            Go Back
          </Link>
        </div>
      </div>
      <hr />
      <div>
        <h1 className="text-center mt-20 text-5xl font-custom font-bold">Modify your Spotify ads</h1>
        <p className="text-center mb-20 mt-5 text-xl">Manage your audio ads for Spotify.</p>
        <div className="flex flex-col m-10 rounded-lg shadow-lg border border-stone-200 bg-white p-10">
          <h1 className="text-4xl font-custom">Spotify Ad 1:</h1>
          <div className="flex flex-col items-center mt-10 flex-grow">
            <audio ref={audioRef} controls className="w-full">
              <source src={parsedData.audio[audioIndex]} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="flex gap-5 mt-5">
              <button onClick={handlePreviousAudio} className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black">
                Previous
              </button>
              <button onClick={handlePlayPause} className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black">
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={handleRewind} className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black">
                Rewind 10s
              </button>
              <button onClick={handleSkipForward} className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black">
                Skip 10s
              </button>
              <button onClick={handleNextAudio} className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black">
                Next
              </button>
            </div>
          </div>
          <div>
            <button className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black mt-10">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlatformSpotify;
