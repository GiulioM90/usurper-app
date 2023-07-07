import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { CssBaseline, Container, Box, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Paper, Slider } from '@mui/material';

import useSound from "use-sound";
import qala from "./cyrcleofthetyrants.mpeg";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import '../../App.css';

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    min: "",
    sec: ""
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: ""
  });

  const [seconds, setSeconds] = useState();

  const [play, { pause, duration, sound }] = useSound(qala);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="component">
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Celtic Frost - tribute band
            </Typography>
            <Typography variant="h5" component="div">
              Playing Now
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Cyrcle of The Tyrants
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardMedia
            sx={{ height: 140 }}
            image="https://picsum.photos/200/200"
            title="green iguana"
            alt="immagine del brano in ascolto"
          />
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <Item> {currTime.min}:{currTime.sec}</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>{time.min}:{time.sec}</Item>
            </Grid>
          </Grid>
          <Slider defaultValue="0" aria-label="Default" valueLabelDisplay="auto" value={seconds} onChange={(e) => {sound.seek([e.target.value]);}} />
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
          </Card>
        </Box>
      </Container>
      <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
      <div>
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}
