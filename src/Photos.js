import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component"; 
import "./photos.css"; 

const GetPhoto = ({ url, key }) => (
    <div className="photo" key={key} >
        <img src={url} alt=""/>
    </div>
  );

export default function Photos (){

    const [photos, setPhotos] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);

    
    React.useEffect(() => {
        fetchImages();
    },);
    
    const fetchImages = (count = 15) => {
        const apiRoot = "https://api.unsplash.com";
        const accessKey = "nP3ufTkXeJvnKZUmFMNKUeFF-ybpH7vn_pG9PSLjvJs";
        axios
        .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
        .then (response => {
            setPhotos([...photos, ...response.data]);
            setLoaded(true); 
        });
    };

    return (
        <div className="main">
              <InfiniteScroll
                dataLength={photos}
                next={() => fetchImages(10)}  
                hasMore={true}
                loader={
                  <img
                    src="https://th.bing.com/th/id/OIP.aNr2Az1aHm9Aqi0V-SVV-QHaFj?w=212&h=180&c=7&o=5&dpr=1.2&pid=1.7"
                    alt="loading"
                  />
                }  
              >
                <div className="allPhotos">
                  {loaded
                    ? photos.map((photo, index) => (
                        <GetPhoto 
                          url={photo.urls.thumb} 
                          key={index}
                        />
                      ))
                    : ""}
                </div>
              </InfiniteScroll>
        </div>
      );
};
