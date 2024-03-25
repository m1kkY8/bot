const stations = {
    NaxiRock: {
        url: "https://naxidigital-rock128ssl.streaming.rs:8182/;*.mp3",
        name: "Naxi Rock",
        info: "https://www.naxi.rs/stations/rs-rock.json",
    },
    NaxiCaffe: {
        url: "https://naxidigital-cafe128ssl.streaming.rs:8022/;*.mp3",
        name: "Naxi Caffe",
        info: "https://www.naxi.rs/stations/rs-cafe.json",
    },
    NaxiJazz: {
        url:"https://naxidigital-jazz128ssl.streaming.rs:8172/;*.mp3",
        name: "Naxi Jazz",
        info: "https://www.naxi.rs/stations/rs-jazz.json",
    },
    NaxiLounge: {
        url: "https://naxidigital-lounge128ssl.streaming.rs:8252/;*.mp3",
        name:"Naxi Lounge",
        info: "https://www.naxi.rs/stations/rs-lounge.json",
    },
    NaxiBoem: {
        url:"https://naxidigital-boem128ssl.streaming.rs:8162/;*.mp3",
        name: "Naxi Boem",
        info: "https://www.naxi.rs/stations/rs-boem.json",
    },
    NaxiClubbing: {
        url:"https://naxidigital-clubbing128ssl.streaming.rs:8092/;*.mp3",
        name: "Naxi Clubbing",
        info: "https://www.naxi.rs/stations/rs-clubbing.json",
    },
}


function generate_list(){

    const station_list = [];

    Object.entries(stations).forEach((ent) => {
        let val = ent[1];
        station_list.push(val);
    })

    return station_list;
}

function generate_radio_table(){
    const stations = generate_list();

    let radio_table = "";
    for(let i = 0; i < stations.length; i++){
        radio_table += `${i + 1}. ${stations[i].name} \n`;
    }
    return radio_table;
}

module.exports = {
    generate_list,
    generate_radio_table

};
