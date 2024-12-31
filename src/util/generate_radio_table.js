const { EmbedBuilder } = require("discord.js");
const { get_stations } = require("./stations.js");

function generate_radio_table() {
  const stations = get_stations();
  const station_list = [];

  Object.entries(stations).forEach((ent) => {
    let val = ent[1];
    station_list.push(val);
  });

  let radio_table = "";
  for (let i = 0; i < station_list.length; i++) {
    radio_table += `${i + 1}. ${station_list[i].name}\n`;
  }

  const embed = new EmbedBuilder()
    .setColor(0x800080)
    .setTitle("Radio")
    .addFields({ name: "Dostupne Stanice", value: radio_table })
    .setTimestamp();

  return embed;
}

generate_radio_table();

module.exports = {
  generate_radio_table,
};
