const stations = {
    Naxi: {
        url: "https://naxi128ssl.streaming.rs:9152/;*.mp3",
        name: "Naxi",
        info: "https://www.naxi.rs/stations/rs-naxi.json",
    },
    NaxiRock: {
        url: "https://naxidigital-rock128ssl.streaming.rs:8182/;*.mp3",
        name: "Naxi Rock",
        info: "https://www.naxi.rs/stations/rs-rock.json",
    },
    NaxiJazz: {
        url:"https://naxidigital-jazz128ssl.streaming.rs:8172/;*.mp3",
        name: "Naxi Jazz",
        info: "https://www.naxi.rs/stations/rs-jazz.json",
    },
    NaxiBoem: {
        url:"https://naxidigital-boem128ssl.streaming.rs:8162/;*.mp3",
        name: "Naxi Boem",
        info: "https://www.naxi.rs/stations/rs-boem.json",
    },
    NaxiCaffe: {
        url: "https://naxidigital-cafe128ssl.streaming.rs:8022/;*.mp3",
        name: "Naxi Caffe",
        info: "https://www.naxi.rs/stations/rs-cafe.json",
    },
    NaxiLounge: {
        url: "https://naxidigital-lounge128ssl.streaming.rs:8252/;*.mp3",
        name:"Naxi Lounge",
        info: "https://www.naxi.rs/stations/rs-lounge.json",
    },
    NaxiClubbing: {
        url:"https://naxidigital-clubbing128ssl.streaming.rs:8092/;*.mp3",
        name: "Naxi Clubbing",
        info: "https://www.naxi.rs/stations/rs-clubbing.json",
    },
}

function get_stations() {
    const station_list = [];

    Object.entries(stations).forEach((ent) => {
        let val = ent[1];
        station_list.push(val);
    });
    return station_list;
}

module.exports = {
    get_stations
};
