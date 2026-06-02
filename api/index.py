import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

import csv
import io
import time
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from ga import jalankan_ga
from utils import hitung_nutrisi, evaluasi_constraints
from data import makanan, SARAPAN_IDS, SIANG_IDS, MALAM_IDS

app = FastAPI(title="Sisehat API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(prefix="/api")


class HasilOptimasi(BaseModel):
    kromosom: list[int]
    menu: dict
    nutrisi: dict
    constraints: dict
    fitness: float
    generasi_selesai: int
    waktu_komputasi: float
    riwayat_fitness: list[dict]


def waktu_makan(id: int) -> str:
    if id in SARAPAN_IDS:
        return "Sarapan"
    if id in SIANG_IDS:
        return "Makan Siang"
    return "Malam"


def build_item_menu(id: int) -> dict:
    m = makanan[id]
    return {
        "nama":    m[5],
        "kalori":  m[0],
        "protein": m[1],
        "lemak":   m[2],
        "karbo":   m[3],
        "harga":   m[4],
    }


@router.post("/optimize", response_model=HasilOptimasi)
def optimize():
    t0 = time.time()
    hasil = jalankan_ga()
    waktu = round(time.time() - t0, 3)
    kromosom = hasil["kromosom_terbaik"]
    g1, g2, g3 = kromosom

    return HasilOptimasi(
        kromosom=kromosom,
        menu={
            "sarapan": build_item_menu(g1),
            "siang":   build_item_menu(g2),
            "malam":   build_item_menu(g3),
        },
        nutrisi=hitung_nutrisi(kromosom),
        constraints=evaluasi_constraints(kromosom),
        fitness=hasil["fitness_terbaik"],
        generasi_selesai=hasil["generasi_selesai"],
        waktu_komputasi=waktu,
        riwayat_fitness=hasil["riwayat_fitness"],
    )


@router.get("/dataset")
def dataset():
    return [
        {**build_item_menu(id), "id": id, "waktu_makan": waktu_makan(id)}
        for id in makanan
    ]


@router.get("/dataset/csv")
def dataset_csv():
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Nama Makanan", "Waktu Makan", "Kalori (kkal)", "Protein (g)", "Lemak (g)", "Karbo (g)", "Harga (Rp)"])
    for id, m in makanan.items():
        writer.writerow([id, m[5], waktu_makan(id), m[0], m[1], m[2], m[3], m[4]])
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=dataset_sisehat.csv"},
    )


@router.get("/health")
def health():
    return {"status": "ok"}


app.include_router(router)
