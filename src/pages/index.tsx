import { Autocomplete, TextField, Button, Box } from '@mui/material';
import { locations, locationsWithlat } from '@/utils/Location';
import { finder } from '@/utils/TrafficFinder';
import { useState } from 'react';
import { trafficCondition } from '@/utils/TrafficCondition';
import TrafficLightCarAnimation from './new';
import { time } from '@/utils/CalculateTime';

export default function Home() {

  const [speed, setSpeed] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [town, setTown] = useState('');
  const [traffic, setTraffic] = useState('');
  const [timeState, setTime] = useState(0);
  const [loading, setLoading] = useState(true);

  const findTraffic = async () => {
    const currentSpeed = await finder({latitude: latitude, longitude: longitude});
    setSpeed(currentSpeed);
    const t = await trafficCondition(currentSpeed);
    setTraffic(t);

    const timeN = await time(currentSpeed);
    setTime(timeN);
    setLoading(false);
  }

  // @ts-ignore
  const tellLocation = async (e) => {
    const city = e.target.innerText;
    setTown(city);

    locationsWithlat.map(item => {
      if (item.name === city) {
        setLatitude(JSON.stringify(item.latitude));
        setLongitude(JSON.stringify(item.longitude));
      }
    })

  }

  return (
    <>
        
        <Box sx={{display: 'flex', justifyContent: 'space-evenly'}} >

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={locations}
          sx={{ width: 300, background: '#0000FF', height: '5vh', margin: '20px' }}
          renderInput={(params) => <TextField {...params} label="Location" />}
          onChange={tellLocation}
        />

        <Button variant="contained" onClick={findTraffic} sx={{height: '3vh', marginTop: '2vh', position: 'relative', left: '-20vw'}} >Find</Button> 

        </Box>

        <h3>You searched for : {town} at latitude and longitude : {latitude} & {longitude}: </h3>
        <h3>And the current speed in {town} is: {speed} which denotes {traffic} </h3>

        <h3>The traffic light duration should be : {timeState} </h3>

        { !loading ?
          <TrafficLightCarAnimation time={timeState} />
        : <></> }

    </>
  )
}
