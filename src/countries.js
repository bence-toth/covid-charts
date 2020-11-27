const countries = [
  {
    name: "Afghanistan",
    slug: "afghanistan",
    population: 38928346,
  },
  // {
  //   name: "Åland Islands",
  //   slug:"ala-aland-islands",
  //   population: 29789
  // },
  {
    name: "Albania",
    slug: "albania",
    population: 2877797,
  },
  {
    name: "Algeria",
    slug: "algeria",
    population: 43851044,
  },
  // {
  //   name: "American Samoa",
  //   slug:"american-samoa",
  //   population: 55191
  // },
  {
    name: "Andorra",
    slug: "andorra",
    population: 77265,
  },
  {
    name: "Angola",
    slug: "angola",
    population: 32866272,
  },
  // {
  //   name: "Anguilla",
  //   slug:"anguilla",
  //   population: 15003
  // },
  // {
  //   name: "Antarctica",
  //   slug:"antarctica",
  //   population: 2000
  // },
  {
    name: "Antigua and Barbuda",
    slug: "antigua-and-barbuda",
    population: 97929,
  },
  {
    name: "Argentina",
    slug: "argentina",
    population: 45195774,
  },
  {
    name: "Armenia",
    slug: "armenia",
    population: 2963243,
  },
  // {
  //   name: "Aruba",
  //   slug:"aruba",
  //   population: 106766
  // },
  {
    name: "Australia",
    slug: "australia",
    population: 25499884,
  },
  {
    name: "Austria",
    slug: "austria",
    population: 9006398,
  },
  {
    name: "Azerbaijan",
    slug: "azerbaijan",
    population: 10139177,
  },
  {
    name: "Bahamas",
    slug: "bahamas",
    population: 393244,
  },
  {
    name: "Bahrain",
    slug: "bahrain",
    population: 1701575,
  },
  {
    name: "Bangladesh",
    slug: "bangladesh",
    population: 164689383,
  },
  {
    name: "Barbados",
    slug: "barbados",
    population: 287375,
  },
  {
    name: "Belarus",
    slug: "belarus",
    population: 9449323,
  },
  {
    name: "Belgium",
    slug: "belgium",
    population: 11589623,
  },
  {
    name: "Belize",
    slug: "belize",
    population: 397628,
  },
  {
    name: "Benin",
    slug: "benin",
    population: 12123200,
  },
  // {
  //   name: "Bermuda",
  //   slug:"bermuda",
  //   population: 62278
  // },
  {
    name: "Bhutan",
    slug: "bhutan",
    population: 771608,
  },
  {
    name: "Bolivia",
    slug: "bolivia",
    population: 11673021,
  },
  {
    name: "Bosnia and Herzegovina",
    slug: "bosnia-and-herzegovina",
    population: 3280819,
  },
  {
    name: "Botswana",
    slug: "botswana",
    population: 2351627,
  },
  // {
  //   name: "Bouvet Island",
  //   slug:"bouvet-island",
  //   population: 1
  // },
  {
    name: "Brazil",
    slug: "brazil",
    population: 212559417,
  },
  // {
  //   name: "British Indian Ocean Territory",
  //   slug:"british-indian-ocean-territory",
  //   population: 3000
  // },
  // {
  //   name: "British Virgin Islands",
  //   slug:"british-virgin-islands",
  //   population: 30231
  // },
  {
    name: "Brunei Darussalam",
    slug: "brunei",
    population: 428962,
  },
  {
    name: "Bulgaria",
    slug: "bulgaria",
    population: 6948445,
  },
  {
    name: "Burkina Faso",
    slug: "burkina-faso",
    population: 20903273,
  },
  {
    name: "Burundi",
    slug: "burundi",
    population: 11890784,
  },
  {
    name: "Cambodia",
    slug: "cambodia",
    population: 16718965,
  },
  {
    name: "Cameroon",
    slug: "cameroon",
    population: 26545863,
  },
  {
    name: "Canada",
    slug: "canada",
    population: 37742154,
  },
  {
    name: "Cape Verde",
    slug: "cape-verde",
    population: 555987,
  },
  // {
  //   name: "Cayman Islands",
  //   slug:"cayman-islands",
  //   population: 65722
  // },
  {
    name: "Central African Republic",
    slug: "central-african-republic",
    population: 4829767,
  },
  {
    name: "Chad",
    slug: "chad",
    population: 16425864,
  },
  {
    name: "Chile",
    slug: "chile",
    population: 19116201,
  },
  {
    name: "China",
    slug: "china",
    population: 1439323776,
  },
  // {
  //   name: "Christmas Island",
  //   slug:"christmas-island",
  //   population: 1843
  // },
  // {
  //   name: "Cocos (Keeling) Islands",
  //   slug:"cocos-keeling-islands",
  //   population: 596
  // },
  {
    name: "Colombia",
    slug: "colombia",
    population: 50882891,
  },
  {
    name: "Comoros",
    slug: "comoros",
    population: 869601,
  },
  {
    name: "Congo (Brazzaville)",
    slug: "congo-brazzaville",
    population: 5518087,
  },
  {
    name: "Congo (Kinshasa)",
    slug: "congo-kinshasa",
    population: 89561403,
  },
  // {
  //   name: "Cook Islands",
  //   slug:"cook-islands",
  //   population: 17564
  // },
  {
    name: "Costa Rica",
    slug: "costa-rica",
    population: 5094118,
  },
  {
    name: "Croatia",
    slug: "croatia",
    population: 4105267,
  },
  {
    name: "Cuba",
    slug: "cuba",
    population: 11326616,
  },
  {
    name: "Cyprus",
    slug: "cyprus",
    population: 1207359,
  },
  {
    name: "Czech Republic",
    slug: "czech-republic",
    population: 10708981,
  },
  {
    name: "Côte d'Ivoire",
    slug: "cote-divoire",
    population: 26378274,
  },
  {
    name: "Denmark",
    slug: "denmark",
    population: 5792202,
  },
  {
    name: "Djibouti",
    slug: "djibouti",
    population: 988000,
  },
  {
    name: "Dominica",
    slug: "dominica",
    population: 71986,
  },
  {
    name: "Dominican Republic",
    slug: "dominican-republic",
    population: 10847910,
  },
  {
    name: "Ecuador",
    slug: "ecuador",
    population: 17643054,
  },
  {
    name: "Egypt",
    slug: "egypt",
    population: 102334404,
  },
  {
    name: "El Salvador",
    slug: "el-salvador",
    population: 6486205,
  },
  {
    name: "Equatorial Guinea",
    slug: "equatorial-guinea",
    population: 1402985,
  },
  {
    name: "Eritrea",
    slug: "eritrea",
    population: 3546421,
  },
  {
    name: "Estonia",
    slug: "estonia",
    population: 1326535,
  },
  {
    name: "Ethiopia",
    slug: "ethiopia",
    population: 114963588,
  },
  // {
  //   name: "Falkland Islands (Malvinas)",
  //   slug:"falkland-islands-malvinas",
  //   population: 3480
  // },
  // {
  //   name: "Faroe Islands",
  //   slug:"faroe-islands",
  //   population: 48497
  // },
  {
    name: "Fiji",
    slug: "fiji",
    population: 896445,
  },
  {
    name: "Finland",
    slug: "finland",
    population: 5540720,
  },
  {
    name: "France",
    slug: "france",
    population: 65273511,
  },
  // {
  //   name: "French Guiana",
  //   slug:"french-guiana",
  //   population: 298682
  // },
  // {
  //   name: "French Polynesia",
  //   slug:"french-polynesia",
  //   population: 280908
  // },
  // {
  //   name: "French Southern Territories",
  //   slug:"french-southern-territories",
  //   population: 300
  // },
  {
    name: "Gabon",
    slug: "gabon",
    population: 2225734,
  },
  {
    name: "Gambia",
    slug: "gambia",
    population: 2416668,
  },
  {
    name: "Georgia",
    slug: "georgia",
    population: 3989167,
  },
  {
    name: "Germany",
    slug: "germany",
    population: 83783942,
  },
  {
    name: "Ghana",
    slug: "ghana",
    population: 31072940,
  },
  // {
  //   name: "Gibraltar",
  //   slug:"gibraltar",
  //   population: 33691
  // },
  {
    name: "Greece",
    slug: "greece",
    population: 10423054,
  },
  // {
  //   name: "Greenland",
  //   slug:"greenland",
  //   population: 56770
  // },
  {
    name: "Grenada",
    slug: "grenada",
    population: 112523,
  },
  // {
  //   name: "Guadeloupe",
  //   slug:"guadeloupe",
  //   population: 400124
  // },
  // {
  //   name: "Guam",
  //   slug:"guam",
  //   population: 168775
  // },
  {
    name: "Guatemala",
    slug: "guatemala",
    population: 17915568,
  },
  // {
  //   name: "Guernsey",
  //   slug:"guernsey",
  //   population: 67052
  // },
  {
    name: "Guinea",
    slug: "guinea",
    population: 13132795,
  },
  {
    name: "Guinea-Bissau",
    slug: "guinea-bissau",
    population: 1968001,
  },
  {
    name: "Guyana",
    slug: "guyana",
    population: 786552,
  },
  {
    name: "Haiti",
    slug: "haiti",
    population: 11402528,
  },
  // {
  //   name: "Heard and Mcdonald Islands",
  //   slug:"heard-and-mcdonald-islands",
  //   population: 1
  // },
  {
    name: "Holy See (Vatican)",
    slug: "holy-see-vatican-city-state",
    population: 801,
  },
  {
    name: "Honduras",
    slug: "honduras",
    population: 9904607,
  },
  // {
  //   name: "Hong Kong, SAR China",
  //   slug:"hong-kong-sar-china",
  //   population: 7496981
  // },
  {
    name: "Hungary",
    slug: "hungary",
    population: 9660351,
  },
  {
    name: "Iceland",
    slug: "iceland",
    population: 341243,
  },
  {
    name: "India",
    slug: "india",
    population: 1380004385,
  },
  {
    name: "Indonesia",
    slug: "indonesia",
    population: 273523615,
  },
  {
    name: "Iran",
    slug: "iran",
    population: 83992949,
  },
  {
    name: "Iraq",
    slug: "iraq",
    population: 40222493,
  },
  {
    name: "Ireland",
    slug: "ireland",
    population: 4937786,
  },
  // {
  //   name: "Isle of Man",
  //   slug:"isle-of-man",
  //   population: 85033
  // },
  {
    name: "Israel",
    slug: "israel",
    population: 8655535,
  },
  {
    name: "Italy",
    slug: "italy",
    population: 60461826,
  },
  {
    name: "Jamaica",
    slug: "jamaica",
    population: 2961167,
  },
  {
    name: "Japan",
    slug: "japan",
    population: 126476461,
  },
  // {
  //   name: "Jersey",
  //   slug:"jersey",
  //   population: 97857
  // },
  {
    name: "Jordan",
    slug: "jordan",
    population: 10203134,
  },
  {
    name: "Kazakhstan",
    slug: "kazakhstan",
    population: 18776707,
  },
  {
    name: "Kenya",
    slug: "kenya",
    population: 53771296,
  },
  // {
  //   name: "Kiribati",
  //   slug:"kiribati",
  //   population: 119449
  // },
  // {
  //   name: "Korea (North)",
  //   slug:"korea-north",
  //   population: 25778816
  // },
  {
    name: "Korea (South)",
    slug: "korea-south",
    population: 51269185,
  },
  {
    name: "Kuwait",
    slug: "kuwait",
    population: 4270571,
  },
  {
    name: "Kyrgyzstan",
    slug: "kyrgyzstan",
    population: 6524195,
  },
  {
    name: "Lao PDR",
    slug: "lao-pdr",
    population: 7275560,
  },
  {
    name: "Latvia",
    slug: "latvia",
    population: 1886198,
  },
  {
    name: "Lebanon",
    slug: "lebanon",
    population: 6825445,
  },
  {
    name: "Lesotho",
    slug: "lesotho",
    population: 2142249,
  },
  {
    name: "Liberia",
    slug: "liberia",
    population: 5057681,
  },
  {
    name: "Libya",
    slug: "libya",
    population: 6871292,
  },
  {
    name: "Liechtenstein",
    slug: "liechtenstein",
    population: 38128,
  },
  {
    name: "Lithuania",
    slug: "lithuania",
    population: 2722289,
  },
  {
    name: "Luxembourg",
    slug: "luxembourg",
    population: 625978,
  },
  // {
  //   name: "Macao, SAR China",
  //   slug:"macao-sar-china",
  //   population: 649335
  // },
  {
    name: "North Macedonia",
    slug: "macedonia",
    population: 2083374,
  },
  {
    name: "Madagascar",
    slug: "madagascar",
    population: 27691018,
  },
  {
    name: "Malawi",
    slug: "malawi",
    population: 19129952,
  },
  {
    name: "Malaysia",
    slug: "malaysia",
    population: 32365999,
  },
  {
    name: "Maldives",
    slug: "maldives",
    population: 540544,
  },
  {
    name: "Mali",
    slug: "mali",
    population: 20250833,
  },
  {
    name: "Malta",
    slug: "malta",
    population: 441543,
  },
  {
    name: "Marshall Islands",
    slug: "marshall-islands",
    population: 59190,
  },
  // {
  //   name: "Martinique",
  //   slug:"martinique",
  //   population: 375265
  // },
  {
    name: "Mauritania",
    slug: "mauritania",
    population: 4649658,
  },
  {
    name: "Mauritius",
    slug: "mauritius",
    population: 1271768,
  },
  // {
  //   name: "Mayotte",
  //   slug:"mayotte",
  //   population: 272815
  // },
  {
    name: "Mexico",
    slug: "mexico",
    population: 128932753,
  },
  // {
  //   name: "Micronesia, Federated States of",
  //   slug:"micronesia",
  //   population: 115023
  // },
  {
    name: "Moldova",
    slug: "moldova",
    population: 4033963,
  },
  {
    name: "Monaco",
    slug: "monaco",
    population: 39242,
  },
  {
    name: "Mongolia",
    slug: "mongolia",
    population: 3278290,
  },
  {
    name: "Montenegro",
    slug: "montenegro",
    population: 628066,
  },
  // {
  //   name: "Montserrat",
  //   slug:"montserrat",
  //   population: 4992
  // },
  {
    name: "Morocco",
    slug: "morocco",
    population: 36910560,
  },
  {
    name: "Mozambique",
    slug: "mozambique",
    population: 31255435,
  },
  {
    name: "Myanmar",
    slug: "myanmar",
    population: 54409800,
  },
  {
    name: "Namibia",
    slug: "namibia",
    population: 2540905,
  },
  // {
  //   name: "Nauru",
  //   slug:"nauru",
  //   population: 10824
  // },
  {
    name: "Nepal",
    slug: "nepal",
    population: 29136808,
  },
  {
    name: "Netherlands",
    slug: "netherlands",
    population: 17134872,
  },
  // {
  //   name: "Netherlands Antilles",
  //   slug:"netherlands-antilles",
  //   population: 26303
  // },
  // {
  //   name: "New Caledonia",
  //   slug:"new-caledonia",
  //   population: 285498
  // },
  {
    name: "New Zealand",
    slug: "new-zealand",
    population: 4822233,
  },
  {
    name: "Nicaragua",
    slug: "nicaragua",
    population: 6624554,
  },
  {
    name: "Niger",
    slug: "niger",
    population: 24206644,
  },
  {
    name: "Nigeria",
    slug: "nigeria",
    population: 206139589,
  },
  // {
  //   name: "Niue",
  //   slug:"niue",
  //   population: 1626
  // },
  // {
  //   name: "Norfolk Island",
  //   slug:"norfolk-island",
  //   population: 1748
  // },
  // {
  //   name: "Northern Mariana Islands",
  //   slug:"northern-mariana-islands",
  //   population: 57559
  // },
  {
    name: "Norway",
    slug: "norway",
    population: 5421241,
  },
  {
    name: "Oman",
    slug: "oman",
    population: 5106626,
  },
  {
    name: "Pakistan",
    slug: "pakistan",
    population: 220892340,
  },
  // {
  //   name: "Palau",
  //   slug:"palau",
  //   population: 18094
  // },
  {
    name: "Palestinian Territory",
    slug: "palestine",
    population: 5101414,
  },
  {
    name: "Panama",
    slug: "panama",
    population: 4314767,
  },
  {
    name: "Papua New Guinea",
    slug: "papua-new-guinea",
    population: 8947024,
  },
  {
    name: "Paraguay",
    slug: "paraguay",
    population: 7132538,
  },
  {
    name: "Peru",
    slug: "peru",
    population: 32971854,
  },
  {
    name: "Philippines",
    slug: "philippines",
    population: 109581078,
  },
  // {
  //   name: "Pitcairn",
  //   slug:"pitcairn",
  //   population: 50
  // },
  {
    name: "Poland",
    slug: "poland",
    population: 37846611,
  },
  {
    name: "Portugal",
    slug: "portugal",
    population: 10196709,
  },
  // {
  //   name: "Puerto Rico",
  //   slug:"puerto-rico",
  //   population: 2860853
  // },
  {
    name: "Qatar",
    slug: "qatar",
    population: 2881053,
  },
  {
    name: "Republic of Kosovo",
    slug: "kosovo",
    population: 1810366,
  },
  {
    name: "Romania",
    slug: "romania",
    population: 19237691,
  },
  {
    name: "Russian Federation",
    slug: "russia",
    population: 145934462,
  },
  {
    name: "Rwanda",
    slug: "rwanda",
    population: 12952218,
  },
  // {
  //   name: "Réunion",
  //   slug:"réunion",
  //   population: 895312
  // },
  // {
  //   name: "Saint Helena",
  //   slug:"saint-helena",
  //   population: 6077
  // },
  {
    name: "Saint Kitts and Nevis",
    slug: "saint-kitts-and-nevis",
    population: 57567,
  },
  {
    name: "Saint Lucia",
    slug: "saint-lucia",
    population: 183627,
  },
  // {
  //   name: "Saint Pierre and Miquelon",
  //   slug:"saint-pierre-and-miquelon",
  //   population: 5794
  // },
  {
    name: "Saint Vincent and Grenadines",
    slug: "saint-vincent-and-the-grenadines",
    population: 110940,
  },
  // {
  //   name: "Saint-Barthélemy",
  //   slug:"saint-barthélemy",
  //   population: 9887
  // },
  // {
  //   name: "Saint-Martin (French part)",
  //   slug:"saint-martin-french-part",
  //   population: 38895
  // },
  // {
  //   name: "Samoa",
  //   slug:"samoa",
  //   population: 198414
  // },
  {
    name: "San Marino",
    slug: "san-marino",
    population: 33931,
  },
  {
    name: "Sao Tome and Principe",
    slug: "sao-tome-and-principe",
    population: 219159,
  },
  {
    name: "Saudi Arabia",
    slug: "saudi-arabia",
    population: 34813871,
  },
  {
    name: "Senegal",
    slug: "senegal",
    population: 16743927,
  },
  {
    name: "Serbia",
    slug: "serbia",
    population: 8737371,
  },
  {
    name: "Seychelles",
    slug: "seychelles",
    population: 98347,
  },
  {
    name: "Sierra Leone",
    slug: "sierra-leone",
    population: 7976983,
  },
  {
    name: "Singapore",
    slug: "singapore",
    population: 5850342,
  },
  {
    name: "Slovakia",
    slug: "slovakia",
    population: 5459642,
  },
  {
    name: "Slovenia",
    slug: "slovenia",
    population: 2078938,
  },
  {
    name: "Solomon Islands",
    slug: "solomon-islands",
    population: 686884,
  },
  {
    name: "Somalia",
    slug: "somalia",
    population: 15893222,
  },
  {
    name: "South Africa",
    slug: "south-africa",
    population: 59308690,
  },
  // {
  //   name: "South Georgia and the South Sandwich Islands",
  //   slug:"south-georgia-and-the-south-sandwich-islands",
  //   population: 30
  // },
  {
    name: "South Sudan",
    slug: "south-sudan",
    population: 11193725,
  },
  {
    name: "Spain",
    slug: "spain",
    population: 46754778,
  },
  {
    name: "Sri Lanka",
    slug: "sri-lanka",
    population: 21413249,
  },
  {
    name: "Sudan",
    slug: "sudan",
    population: 43849260,
  },
  {
    name: "Suriname",
    slug: "suriname",
    population: 586632,
  },
  // {
  //   name: "Svalbard and Jan Mayen Islands",
  //   slug:"svalbard-and-jan-mayen-islands",
  //   population: 2939
  // },
  {
    name: "Swaziland",
    slug: "swaziland",
    population: 1160000,
  },
  {
    name: "Sweden",
    slug: "sweden",
    population: 10099265,
  },
  {
    name: "Switzerland",
    slug: "switzerland",
    population: 8654622,
  },
  {
    name: "Syria",
    slug: "syria",
    population: 17500658,
  },
  {
    name: "Taiwan",
    slug: "taiwan",
    population: 23816775,
  },
  {
    name: "Tajikistan",
    slug: "tajikistan",
    population: 9537645,
  },
  {
    name: "Tanzania",
    slug: "tanzania",
    population: 59734218,
  },
  {
    name: "Thailand",
    slug: "thailand",
    population: 69799978,
  },
  {
    name: "Timor-Leste",
    slug: "timor-leste",
    population: 1318445,
  },
  {
    name: "Togo",
    slug: "togo",
    population: 8278724,
  },
  // {
  //   name: "Tokelau",
  //   slug:"tokelau",
  //   population: 1357
  // },
  // {
  //   name: "Tonga",
  //   slug:"tonga",
  //   population: 105695
  // },
  {
    name: "Trinidad and Tobago",
    slug: "trinidad-and-tobago",
    population: 1399488,
  },
  {
    name: "Tunisia",
    slug: "tunisia",
    population: 11818619,
  },
  {
    name: "Turkey",
    slug: "turkey",
    population: 84339067,
  },
  // {
  //   name: "Turkmenistan",
  //   slug:"turkmenistan",
  //   population: 6031200
  // },
  // {
  //   name: "Turks and Caicos Islands",
  //   slug:"turks-and-caicos-islands",
  //   population: 40397
  // },
  // {
  //   name: "Tuvalu",
  //   slug:"tuvalu",
  //   population: 11792
  // },
  // {
  //   name: "US Minor Outlying Islands",
  //   slug:"us-minor-outlying-islands",
  //   population: 300
  // },
  {
    name: "Uganda",
    slug: "uganda",
    population: 45741007,
  },
  {
    name: "Ukraine",
    slug: "ukraine",
    population: 43733762,
  },
  {
    name: "United Arab Emirates",
    slug: "united-arab-emirates",
    population: 9890402,
  },
  {
    name: "United Kingdom",
    slug: "united-kingdom",
    population: 67886011,
  },
  {
    name: "United States of America",
    slug: "united-states",
    population: 331002651,
  },
  {
    name: "Uruguay",
    slug: "uruguay",
    population: 3473730,
  },
  {
    name: "Uzbekistan",
    slug: "uzbekistan",
    population: 33469203,
  },
  // {
  //   name: "Vanuatu",
  //   slug:"vanuatu",
  //   population: 307145
  // },
  {
    name: "Venezuela",
    slug: "venezuela",
    population: 28435940,
  },
  {
    name: "Viet Nam",
    slug: "vietnam",
    population: 97338579,
  },
  // {
  //   name: "Virgin Islands, US",
  //   slug:"virgin-islands",
  //   population: 104425
  // },
  // {
  //   name: "Wallis and Futuna Islands",
  //   slug:"wallis-and-futuna-islands",
  //   population: 11172
  // },
  {
    name: "Western Sahara",
    slug: "western-sahara",
    population: 597339,
  },
  {
    name: "Yemen",
    slug: "yemen",
    population: 29825964,
  },
  {
    name: "Zambia",
    slug: "zambia",
    population: 18383955,
  },
  {
    name: "Zimbabwe",
    slug: "zimbabwe",
    population: 14862924,
  },
];

export default countries;
