using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace aspnetapp.Migrations
{
    /// <inheritdoc />
    public partial class _1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApplicationUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Surname = table.Column<string>(type: "text", nullable: true),
                    Photo = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Procedures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Procedures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Steps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: false),
                    duration = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Steps", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tools",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Modelo = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tools", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserApiKeys",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Value = table.Column<string>(type: "text", nullable: false),
                    UserID = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserApiKeys", x => x.ID);
                    table.ForeignKey(
                        name: "FK_UserApiKeys_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Practices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Observations = table.Column<string>(type: "text", nullable: true),
                    Duration = table.Column<int>(type: "integer", nullable: false),
                    ProcedureId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: true),
                    StepId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Practices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Practices_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Practices_Procedures_ProcedureId",
                        column: x => x.ProcedureId,
                        principalTable: "Procedures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Practices_Steps_StepId",
                        column: x => x.StepId,
                        principalTable: "Steps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProcedureStep",
                columns: table => new
                {
                    ProceduresId = table.Column<int>(type: "integer", nullable: false),
                    StepsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcedureStep", x => new { x.ProceduresId, x.StepsId });
                    table.ForeignKey(
                        name: "FK_ProcedureStep_Procedures_ProceduresId",
                        column: x => x.ProceduresId,
                        principalTable: "Procedures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcedureStep_Steps_StepsId",
                        column: x => x.StepsId,
                        principalTable: "Steps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StepTool",
                columns: table => new
                {
                    StepsId = table.Column<int>(type: "integer", nullable: false),
                    ToolsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StepTool", x => new { x.StepsId, x.ToolsId });
                    table.ForeignKey(
                        name: "FK_StepTool_Steps_StepsId",
                        column: x => x.StepsId,
                        principalTable: "Steps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StepTool_Tools_ToolsId",
                        column: x => x.ToolsId,
                        principalTable: "Tools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Practices_ProcedureId",
                table: "Practices",
                column: "ProcedureId");

            migrationBuilder.CreateIndex(
                name: "IX_Practices_StepId",
                table: "Practices",
                column: "StepId");

            migrationBuilder.CreateIndex(
                name: "IX_Practices_UserId",
                table: "Practices",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcedureStep_StepsId",
                table: "ProcedureStep",
                column: "StepsId");

            migrationBuilder.CreateIndex(
                name: "IX_StepTool_ToolsId",
                table: "StepTool",
                column: "ToolsId");

            migrationBuilder.CreateIndex(
                name: "IX_UserApiKeys_UserID",
                table: "UserApiKeys",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_UserApiKeys_Value",
                table: "UserApiKeys",
                column: "Value",
                unique: true);

            // Seed data
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1", "1", "Admin", "ADMIN" },
                    { "2", "2", "Teacher", "TEACHER" },
                    { "3", "3", "Student", "STUDENT" }

                });
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", "TwoFactorEnabled","PhoneNumberConfirmed", "LockoutEnabled", "AccessFailedCount", "PasswordHash"},
                values: new object[,]
                {
                    { "1", "admin", "ADMIN", "admin@example.es", "ADMIN@EXAMPLE.ES", false, false, false, true, 0,"AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw=="  },
                    { "2", "teacher", "TEACHER", "teacher@example.es", "TEACHER@EXAMPLE.ES", false, false, false, true, 0,"AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw==" },
                    { "3", "student", "STUDENT", "student@example.es", "STUDENT@EXAMPLE.ES", false , false, false, true, 0,"AQAAAAIAAYagAAAAEE0A7Ewgd3h9osBEANSfNlWshhxLJ0L96PtmV+dmHyggq5njh+VwUKXPRSLvs6jySw==" }
                }
            );
            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" },
                values: new object[,]
                {
                    { "1", "1" },
                    { "2", "2" },
                    { "3", "3" }
                }
            );

            migrationBuilder.InsertData(
                table: "Procedures",
                columns: new[] { "Id", "Name", },
                values: new object[,]
                {
                    { 1, "Cateterismo" },
                }
            );

            migrationBuilder.InsertData(
                table: "Steps",
                columns: new[] { "Id", "Name", "Description",  "duration", "Image" },
                values: new object[,]
                {
                    { 1, "Estudio de imagen preoperatorio", "Una vez elegido al paciente para TAVI no femoral, se realiza un análisis de la tomografía computarizada para establecer varios objetivos. La adquisición de las imágenes para el análisis de la raíz aórtica debe realizarse de manera sincronizada con el electrocardiograma para evitar artefactos de movimiento, optando por una sincronización retrospectiva en los casos de fibrilación auricular o frecuencias cardiacas elevadas. Para disminuir esos artefactos y mejorar la calidad de las imágenes, es importante titular la dosis de betabloqueante por vía oral o calcioantagonista no dihidropiridínico hasta conseguir frecuencias cardiacas en torno a 60 latidos por minuto en reposo.", "50", "default"
                     },
                    { 2, "Valoración y medición del anillo aórtico", "La medición del anillo aórtico requiere la manipulación y el posprocesado de las imágenes hasta conseguir una imagen que se corresponda con el anillo basal de la válvula aórtica, que se define por el nivel situado inmediatamente por debajo de los 3 puntos de inserción más bajos de las cúspides aórticas. Estas medidas necesarias para la selección del tamaño adecuado de la prótesis, incluyen: 1. Medición del diámetro mayor (Dmayor) y menor (Dmenor) del anillo aórtico para el cálculo del diámetro medio (D) que se obtiene promediando los 2 valores (D = [Dmayor+Dmenor]/2). 2. Medición del perímetro del anillo aórtico. 3. Planimetría del área anillo aórtico. Para la válvula Edwards Sapien (Edwards Lifesciences), el anillo debe medir entre 18 -25mm, mientras que para la válvula CoreValve (Medtronic) el anillo debe medir entre 20-27mm.", "45", "default"
                    },
                    { 3, "Valoración del calcio a nivel de anillo aórtico y plano valvular.", "La TCMD (Tomografía Computerizada Multidetector) es la técnica de imagen de elección para la detección y la cuantificación de calcio. El grado de calcificación de los velos aórticos valorado en la TCMD previo al implante se correlaciona significativamente con el riesgo de complicaciones durante el TAVI. La fuga paravalvulvar se ve favorecida por el incorrecto despliegue de la prótesis contra la pared aórtica en presencia de calcio, incluso tras el inflado o balonización de la prótesis.", "25", "default"
                    },
                    { 4, "Valoración de las arterias coronarias", "La distancia del plano aórtico origen de ambas arterias coronarias es una medida relevante en el estudio preimplantación de la prótesis percutánea aórtica. A diferencia de lo que ocurre durante el reemplazo quirúrgico valvular aórtico en el cual las valvas son reseccionadas, durante el TAVI las valvas nativas son desplazadas y aplastadas por la prótesis, pudiendo ocasionar complicaciones tan graves como una oclusión coronaria o lesión de la raíz aórtica, así como el riesgo de obstrucción del flujo coronario por el propio stent de la válvula aórtica. Se indican valores de distancia mínimos de 10-14mm entre el origen de las arterias coronarias y la inserción de las valvas para evitar complicaciones en el implante de ambas prótesis.", "100", "default"
                    },
                    { 5, "Valoración de la posición del plano de implantación", "Durante la implantación de la prótesis percutánea aórtica puede ser necesaria la realización de múltiples proyecciones angiográficas hasta encontrar un plano en el que todas las cúspides de los senos de Valsalva queden alineadas perpendicularmente en el mismo plano. La mayoría de los operadores prefieren una proyección en la que la cúspide coronaria derecha es central, mientras que la no coronariana e izquierda están situadas simétricamente a cada lado. Diversos estudios han demostrado que el TCMD predice correctamente la proyección angiográfica perpendicular al plano valvular aórtico, que ayuda a guiar el proceso y correcto posicionamiento de la prótesis percutánea aórtica.", "100", "default"
                    },
                    { 6, "Anestesia y monitorización", "Se emplea anestesia general, se canalizan las vías venosas central y periférica, y se procede a la monitorización arterial invasiva. Se dispone el campo quirúrgico dejando preparadas las dos regiones inguinales y el tórax de forma completa por si se necesita reconvertir el procedimiento a una cirugía convencional.", "100", "default"
                    },
                    { 7, "Administración de heparina e incisión inguinal", "Se administra heparina sódica a dosis de 5.000 UI y se realiza una pequeña incisión en la ingle derecha para la introducción de un electrodo de marcapasos por la vena femoral, usando un electrodo de fijación pasiva.", "75", "default"
                    },
                    { 8, "Canalización de la arteria femoral", "Se canaliza la arteria femoral derecha y se introduce un pigtail centimetrado que ayuda a la localización del plano valvular, la realización de aortografías y a confirmar la distancia desde el punto de punción en la aorta ascendente hasta el anillo aórtico.", "200", "default"
                    },
                    { 9, "Colocación del sistema de radioscopia", "Se coloca el sistema de radioscopia según el ángulo prefijado por la tomografía computarizada y se comprueba la correcta alineación de los velos mediante la realización de una aortografía.", "152", "default"
                    },
                    { 10, "Miniesternotomía", "Se realiza una miniincisión en la piel de 4 cm y con la ayuda de una sierra oscilante se practica una miniesternotomía en J hasta el segundo espacio intercostal.", "200", "default"
                    },
                    { 11, "Apertura del pericardio.", "Se coloca un miniseparador esternal, se abre el pericardio y se aplican puntos de tracción del mismo hacia arriba que nos faciliten la exposición de la aorta distal. Se emplean dos suturas en bolsa de tabaco apoyadas en teflón sobre la aorta ascendente tras la palpación y comprobación radiológica de la distancia del sitio de punción al anillo aórtico.", "200", "default"
                    },
                    { 12, "Introducción del catéter a través de la válvula aórtica", "Se realiza una punción en el centro de la bolsa de tabaco y se inserta un introductor arterial de 6F. Las maniobras para cruzar retrógradamente la válvula aórtica se realizan con el empleo de una guía teflonada recta de 35’ y de 260cm de largo, siendo a veces necesario el uso de guías hidrofílicas.", "200", "default"
                    },
                    { 13, "Introducción de la guía extrastiff en el ventrículo", "Una vez que el catéter ha cruzado la válvula aórtica, se intercambia dicha guía por una guía extrastiff. Actualmente se usan guías preformadas como la Confida o en ocasiones, también con muy buenos resultados, la Safari. Es importante que la guía rígida haga una curva suave y se adapte al ventrículo, siendo necesario con frecuencia usar un pigtail para su correcta colocación.", "200", "default"
                    },
                    { 14, "Colocación del introductor Certitude en la aorta", "Se retira el introductor de 6F y se coloca el introductor Certitude dentro de la aorta asta la marca de 2 cm. Es interesante emplear un tope visible en la marca de 2cm que nos ayuda a controlar la hemostasia y la cantidad de introductor que se localiza dentro de la aorta. Las maniobras de retirada e introducción de catéteres deben ser muy suaves y controladas, ya que, a diferencia de la vía apical, disponemos de muy poca guía dentro del ventrículo y es muy fácil su dislocación en caso de maniobras intempestivas", "200", "default"
                    },
                    { 15, "Práctica de la valvuloplastia", "Se introduce el catéter balón de valvuloplastia y con previa sobreestimulación se realiza esta práctica. La retirada de dicho catéter se debe hacer con sumo cuidado, ya que en esta maniobra es muy fácil la dislocación de la guía e incluso su salida del ventrículo, lo que nos obligaría a repetir todo un repertorio de maniobras para recolocarla en el ventrículo.", "200", "default"
                    },
                    { 16, "Colocación y expansión de la prótesis", "Se introduce la prótesis hasta el plano anular guiados por el pigtail. El punto del centro debe quedar un poco por encima del plano anular para minimizar el bloqueo aurículo-ventricular. Se practica sobreestimulación y tras la caída de la presión arterial se realiza una aortografía que nos permite confirmar la adecuada colocación de la prótesis, la cuál se expande con un inflado muy lento del balón, que nos permite pequeños reajustes en el implante en caso de ser necesario.", "200", "default"
                    },
                    { 17, "Comprobación del funcionamiento de la prótesis valvular y cirre de la herida quirúrgica", "Se comprueba con ecocardiografía el normofuncionamiento de la prótesis valvular implantada y se retiran la guía, el catéter balón y el introductor, procediendo al anudado de las bolsas de tabaco y al cierre convencional de la esternotomía y la herida quirúrgica.", "200", "default"
                     }
                }
            );

            migrationBuilder.InsertData(
                table: "ProcedureStep",
                columns: new[] { "ProceduresId", "StepsId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 1, 3},
                    { 1, 4},
                    { 1, 5},
                    { 1, 6},
                    { 1, 7},
                    { 1, 8},
                    { 1, 9},
                    { 1, 10},
                    { 1, 11},
                    { 1, 12},
                    { 1, 13},
                    { 1, 14},
                    { 1, 15},
                    { 1, 16},
                    { 1, 17}
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUsers");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Practices");

            migrationBuilder.DropTable(
                name: "ProcedureStep");

            migrationBuilder.DropTable(
                name: "StepTool");

            migrationBuilder.DropTable(
                name: "UserApiKeys");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Procedures");

            migrationBuilder.DropTable(
                name: "Steps");

            migrationBuilder.DropTable(
                name: "Tools");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
