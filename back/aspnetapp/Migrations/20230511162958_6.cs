using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace aspnetapp.Migrations
{
    /// <inheritdoc />
    public partial class _6 : Migration
    {
        /// <inheritdoc /> 
        
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
              // Seed data
           migrationBuilder.InsertData(
                table: "Tools",
                columns: new[] { "Id","Name", "Description", "Modelo" },
                 values: new object[,]     
            {
            {1 ,"Aguja guía de paso", "Aguja que se utiliza para guiar el paso de los instrumentos a través de la piel y hasta la arteria.", "Aguja_guía_Paso01.fbx"},
            {2 ,"Balón de paso", "Globo inflable en el extremo del catéter que se utiliza durante un procedimiento de cateterismo para agrandar una abertura estrecha o pasaje dentro del cuerpo (en este caso, la válvula aórtica).", "Balón_Paso12.fbx"},
            {3 ,"Insertor grande de paso", "Canaliza la arteria, permitiendo la posterior introducción del catéter y otros instrumentos.", "Insertor_grande_Paso10.fbx"},
            {4 ,"Introductor pequeño de paso", "Permite introducir el catéter en la arteria.", "Introductor_pequeno_Paso03.fbx"},
            {5 ,"Presurizador", "Permite medir la presión arterial en el paciente mediante una monitorización continua.", "Presurizador.fbx"},
            {6 ,"Válvula", "Se introducirá mediante el catéter, se posicionará cuando se infle el globo y sustituirá la válvula aórtica enferma.", "Válvula.fbx"},
           
            }
            );
            migrationBuilder.InsertData(
                table: "StepTool",
                columns: new[] {  "StepsId", "ToolsId" },
                values: new object[,]        
            {
            {1,1},
            {1,2},
            {1,3},
            {1,4},
            {1,5},
            {1,6},
            {2,1},
            {2,2},
            {2,3},
            {2,4},
            {2,5},
            {2,6},
            {3,1},
            {3,2},
            {3,3},
            {3,4},
            {3,5},
            {3,6},
            {4,1},
            {4,2},
            {4,3},
            {4,4},
            {4,5},
            {4,6},
            {5,1},
            {5,2},
            {5,3},
            {5,4},
            {5,5},
            {5,6},
            {6,1},
            {6,2},
            {6,3},
            {6,4},
            {6,5},
            {6,6},
            {7,1},
            {7,2},
            {7,3},
            {7,4},
            {7,5},
            {7,6},
            {8,1},
            {8,2},
            {8,3},
            {8,4},
            {8,5},
            {8,6},
            {9,1},
            {9,2},
            {9,3},
            {9,4},
            {9,5},
            {9,6},
            {10,1},
            {10,2},
            {10,3},
            {10,4},
            {10,5},
            {10,6},
            {11,1},
            {11,2},
            {11,3},
            {11,4},
            {11,5},
            {11,6},
            {12,1},
            {12,2},
            {12,3},
            {12,4},
            {12,5},
            {12,6},
            {13,1},
            {13,2},
            {13,3},
            {13,4},
            {13,5},
            {13,6},
            {14,1},
            {14,2},
            {14,3},
            {14,4},
            {14,5},
        }
        );
    }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
