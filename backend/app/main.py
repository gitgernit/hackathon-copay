import fastapi
from fastapi.middleware.cors import CORSMiddleware

import app.api.routers

app_router = fastapi.FastAPI()
app_router.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app_router.include_router(
    app.api.routers.api_router,
    prefix='/api',
)
