module.exports = {
    name: "addrole",
    description: "Hozzáad egy rangot egy megadott felhasználóhoz",
    role: "admin",
  
    options: [
      {
        name: "user",
        description: "Felhasználó, akinek hozzáadjuk a rangot",
        required: true,
        type: "USER",
      },
      {
        name: "role",
        description: "Rang, amelyet hozzáadjuk a felhasználóhoz",
        required: true,
        type: "ROLE",
      },
    ],
  
    run: async (client, interaction, args) => {
      const target = interaction.options.getUser("user");
      const role = interaction.options.getRole("role");
  
      if (!role) {
        return interaction.reply({ content: `Nem található rang`, ephemeral: true });
      }
  
      const targetMember = interaction.guild.members.cache.get(target.id);
  
      if (targetMember.roles.cache.has(role.id)) {
        return interaction.reply({ content: `A felhasználó már rendelkezik a ${role.name} rangal`, ephemeral: true });
      }
  
      try {
        await targetMember.roles.add(role);
        await interaction.reply({ content: `Sikeresen hozzáadtuk a ${role.name} rangot a ${target.username}#${target.discriminator} felhasználóhoz`, ephemeral: true });
        await target.send(`Megkaptad a ${role.name} rangot`);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: `Hiba történt a szerepkör hozzáadásakor: ${error.message}`, ephemeral: true });
      }
    },
  };