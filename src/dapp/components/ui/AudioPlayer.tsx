import React, { useState, useRef, useEffect } from "react";
import leftEdge from "../../images/ui/panel1/dt_box_9slice_lc.png";
import rightEdge from "../../images/ui/panel1/dt_box_9slice_rc.png";
import bottomEdge from "../../images/ui/panel1/dt_box_9slice_bc.png";
import topEdge from "../../images/ui/panel1/dt_box_9slice_tc.png";
import topLeft from "../../images/ui/panel1/dt_box_9slice_tl.png";
import bottomLeft from "../../images/ui/panel1/dt_box_9slice_bl.png";
import topRight from "../../images/ui/panel1/dt_box_9slice_tr.png";
import bottomRight from "../../images/ui/panel1/dt_box_9slice_br.png";
import play from "../../images/ui/audio-player/play.png";
import pause from "../../images/ui/audio-player/pause.png";
import next from "../../images/ui/audio-player/next.png";
import note from "../../images/ui/audio-player/note.png";
import { playlist } from "../../songs/playlist.ts";
import "./AudioPlayer.css";

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<Boolean>(false);
  const [music, setMusic] = useState(0);
  const [volume, setVolume] = useState<number>(0.5);
  const file = useRef(null);

  const togglePlayStop = () => {
    if (file.current?.paused) {
      file.current.play();
      setIsPlaying(true);
    } else {
      file.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (music + 2 > playlist.length) {
      setMusic(0);
    } else {
      setMusic(music + 1);
    }
  };

  useEffect(() => {
    console.log(file.current.src);
    if (file) {
      file.current.volume = volume;
    }
  }, [volume]);

  return (
    <div id="audio-player-container" style={{ height: "72px" }}>
      <audio
        ref={file}
        autoPlay={true}
        controls={true}
        loop
        id="audio-player"
      >
        <source src={playlist[music].file} />
      </audio>
      <img id="panel-left-edge" src={leftEdge} />
      <img id="panel-right-edge" src={rightEdge} />
      <img id="panel-bottom-edge" src={bottomEdge} />
      <img id="panel-top-edge" src={topEdge} />
      <img id="panel-top-left" src={topLeft} />
      <img id="panel-bottom-left" src={bottomLeft} />
      <img id="panel-bottom-right" src={bottomRight} />
      <img id="panel-top-right" src={topRight} />
      <div id="controls">
        <img
          onClick={() => togglePlayStop()}
          id="play-pause"
          src={isPlaying ? pause : play}
          alt=""
        />
        <img
          onClick={() => handleNext()}
          id="next"
          src={next}
          alt="next song"
        />
        <input
          type="range"
          defaultValue={50}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value) / 100)}
          id="volume"
        />
      </div>
    </div>
  );
};
