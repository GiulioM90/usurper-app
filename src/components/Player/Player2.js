import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';


import useSound from "use-sound";
import {Howl, Howler} from 'howler';

const songs = [
  {
    id: 1,
    title: "Usurper",
    file: require("../assets/usurper.mpeg"),
  },
  {
    id: 2,
    title: "Babylon Fell",
    file: require("../assets/babylonfell.mpeg"),
  },
  {
    id: 3,
    title: "Cyrcle of the Thyrants",
    file: require("../assets/cyrcleofthetyrants.mpeg"),
  },
];

const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: 'linear-gradient(rgb(255, 255, 255) 0%, rgb(0, 0, 0) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&:before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background: 'radial-gradient(at center center, rgb(255, 0, 0) 0%, rgba(255, 0, 0, 0) 64%)',
  },
  '&:after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  height:'70vh',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  marginTop: 'auto',
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicPlayerSlider() {

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentSong = songs[currentSongIndex];
  // const [play, { stop, pause, duration, sound }] = useSound(currentSong.file);
  const [time, setTime] = useState({ min: '', sec: '' });
  const [currTime, setCurrTime] = useState({ min: '', sec: '' });
  const [seconds, setSeconds] = useState();
  const [paused, setPaused] = useState(true);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    if (currentSong) {
      console.log(currentSong)
      const newSound = new Howl({
        src: currentSong.file,
        html5: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
        onload: () => {
          const sec = newSound.duration() / 1000;
          const min = Math.floor(sec / 60);
          const secRemain = Math.floor(sec % 60);
          setTime({ min, sec: secRemain });
        },
        onplayerror: () => {
          console.error('Failed to play audio');
        },
      });
      setSound(newSound);
    }
  }, [currentSong]);

  useEffect(() => {
    if (sound) {
      const interval = setInterval(() => {
        if (sound.playing()) {
          setSeconds(sound.seek());
          const min = Math.floor(sound.seek() / 60);
          const sec = Math.floor(sound.seek() % 60);
          setCurrTime({ min, sec });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sound]);


  const handleNextSong = () => {
    if (isPlaying) {
      if (sound.playing()) {
        sound.stop();
      } else {
        sound.play();
      }
      setIsPlaying(false);
      setPaused(true);
    }
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
  };
  
  const handlePreviousSong = () => {
    if (isPlaying) {
      if (sound.playing()) {
        sound.stop();
      } else {
        sound.play();
      }
      setIsPlaying(false);
      setPaused(true);
    }
    const previousIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(previousIndex);
  };

  const playingButton = () => {
    console.log(currentSong)
    if (isPlaying) {
      if (sound.playing()) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(false);
      setPaused(true);
    } else {
      if (sound.playing()) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(true);
      setPaused(false);
    }
  };

  const theme = useTheme();
//   const duration = 200; // seconds

//   function formatDuration(value) {
//     const minute = Math.floor(value / 60);
//     const secondLeft = value - minute * 60;
//     return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
//   }
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  return (
    <Box sx={{ width: '100%', overflow: 'hidden', display: 'flex', height:'100vh' }}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CoverImage>
            <img
              alt="immagine canzone selezionata"
              src="./usurperlogo.jpeg"
            />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              Fottiti
            </Typography>
            <Typography noWrap>
              <b>Usurper</b>
            </Typography>
            <Typography noWrap letterSpacing={-0.25}>
              {currentSong.title}
            </Typography>
          </Box>
        </Box>
        {/* <Slider
          defaultValue="0"
          max={sound && sound.duration() || 0}
          aria-label="Default" 
          value={seconds} 
          onChange={(e) => {sound.seek(e.target.value);}} 
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        /> */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>-{time.sec}:{time.sec}</TinyText>
          <TinyText>{currTime.min}:{currTime.sec}</TinyText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} onClick={handlePreviousSong}/>
          </IconButton>
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={playingButton}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} onClick={handleNextSong}/>
          </IconButton>
        </Box>
        {/* <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                backgroundColor: '#fff',
                '&:before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack> */}
      </Widget>
      <WallPaper />
    </Box>
  );
}