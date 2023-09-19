import axios from "axios";

interface props {
    latitude: string,
    longitude: string,
}

export const finder = async ( {latitude, longitude}: props ) => {

    const LINK = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=8kA24qsLXKjgaCdRfqHAjwUZjuEDcEGO&point=${latitude},${longitude}`

    const req = await axios.get(LINK);
    const res = req.data.flowSegmentData.currentSpeed;
    return res;

}