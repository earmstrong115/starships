using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StarWarsApi.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Starship",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    cost_in_credits = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    length = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    max_atmosphering_speed = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    crew = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    passengers = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    cargo_capacity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    consumables = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    hyperdrive_rating = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MGLT = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    starship_class = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Starship", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Starship");
        }
    }
}
