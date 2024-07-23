import React, { useState, useEffect, useRef } from "react";
import NavLogo from "../components/navLogo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

function PlatformSpotify() {
  const location = useLocation();
  const navigate = useNavigate();
  const { parsedData } = location.state || {};

  const [audioIndex, setAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (parsedData && parsedData.audio) {
      console.log("Audio URLs:", parsedData.audio);
      // Verify if the URLs are accessible
      parsedData.audio.forEach((url) => {
        fetch(url)
          .then((response) => {
            if (response.ok) {
              console.log(`URL ${url} is accessible`);
            } else {
              console.error(`URL ${url} is not accessible`);
            }
          })
          .catch((error) => console.error(`Error accessing URL ${url}:`, error));
      });
    }
  }, [parsedData]);

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
          <div className="flex flex-col items-start mt-10 flex-grow">
            <audio ref={audioRef} className="w-full bg-transparent appearance-none">
              <source src={parsedData.audio[audioIndex]} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="flex justify-start gap-5 mt-5">
              <button onClick={handlePlayPause} className="py-2 px-5 rounded-md text-stone-400 font-custom font-black">
                <FontAwesomeIcon
                  icon={isPlaying ? faPause : faPlay}
                />
              </button>
              <button onClick={handleRewind} className="py-2 px-5 rounded-md text-stone-400 font-custom font-black">
                <FontAwesomeIcon
                  icon={faBackward}
                />
              </button>
              <button onClick={handleSkipForward} className="py-2 px-5 rounded-md text-stone-400 font-custom font-black">
              <FontAwesomeIcon
                  icon={faForward}
                />
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
