import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { currentTrackIdState } from "../atoms/songAtom"
import useSpotify from "./useSpotify"

function useSongInfo() {
    const spotifyApi = useSpotify()
    const currentTrackId = useRecoilValue(currentTrackIdState)
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
        const fetchSongInfo = async () => {
            if(currentTrackId) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers: { 
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}` 
                        }
                    }
                ).then(res => res.json()).catch(err => {/**/})
                    
                setSongInfo(trackInfo)
            }
        }

        fetchSongInfo()
    }, [currentTrackId, spotifyApi])

    return songInfo
}

export default useSongInfo
