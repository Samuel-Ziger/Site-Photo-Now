tailwind-elements (components prontos - visuais)
https://tailwind-elements.com/

clipping:
http://fabricjs.com/clipping

firebase doc extra
https://modularfirebase.web.app/common-use-cases/storage/

screem settings: (?)
768 width
1366 height

COMANDOS NECESSRIOS PARA FUNCIONAMENTO DO SISTEMA

arquivo: (cors.json)
[
{
"origin": ["*"],
"method": ["GET"],
"maxAgeSeconds": 3600
}
]

// CORS ERROR RESOLVER:
gsutil cors set cors.json gs://teste.appspot.com
gsutil cors set cors.json gs://photonow-app-molduras

// info
gcloud storage buckets describe gs://photonow-app-molduras --format="default(cors)"

// update
gcloud storage buckets update gs://photonow-app-molduras --cors-file=cors.json

# DEV

TOTEM PARA TESTES: eFS8Hb7LgE6K0KQMPf8w