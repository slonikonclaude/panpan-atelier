# python _data/scripts/make-photos.py — originals (_data/orig/pNNN.jpg, Google =s0) → _photos/<name>.jpg
# Each entry: name, source photo, optional crop box in fractions (left, top, right, bottom). Long side ≤ 2400 px.
# The list is the photo selection of DESIGN.md §8; alt texts live in lib/photos.ts.
from PIL import Image, ImageOps

PICKS = [
    ("hero", "p206", None),                       # mesa junto al ventanal, capuchino y focaccia; «pan pan» en el cristal
    ("desayuno", "p000", (0.07, 0.0, 1.0, 1.0)),  # vista cenital; se recorta la pierna de un cliente a la izquierda
    ("desayuno-cruasan", "p173", None),
    ("tostada-aguacate", "p198", None),
    ("ensalada", "p017", None),
    ("sandwich-club", "p008", None),
    ("tostada-tomate", "p216", None),
    ("cruasan", "p178", None),
    ("napolitana", "p073", None),
    ("donut", "p189", None),
    ("tarta-queso", "p190", None),
    ("coca-calabaza", "p182", (0.0, 0.0, 0.86, 1.0)),  # el tique del cliente (a la derecha) nombra la «COCA DE CALABAZA»; se recorta
    ("tulipa", "p184", None),
    ("licuados", "p200", None),
    ("vitrina-bolleria", "p014", None),
    ("vitrina-empanadillas", "p196", None),
    ("vitrina-dulce", "p046", None),
    ("vitrina-salados", "p044", None),
    ("rincon", "p107", None),
    ("lema", "p115", None),
    ("barra", "p112", None),
    ("ventanal", "p116", None),
    ("hornacinas", "p130", None),
    ("fachada", "p121", None),
    ("fachada-calle", "p111", None),
    ("esquina", "p159", None),
    ("terraza", "p054", None),
]

for name, src, box in PICKS:
    im = ImageOps.exif_transpose(Image.open(f"_data/orig/{src}.jpg")).convert("RGB")
    if box:
        w, h = im.size
        im = im.crop((int(box[0] * w), int(box[1] * h), int(box[2] * w), int(box[3] * h)))
    im.thumbnail((2400, 2400), Image.LANCZOS)
    im.save(f"_photos/{name}.jpg", quality=90, optimize=True)
    print(f"{name:22} {src}  {im.size[0]}x{im.size[1]}")
