from PIL import Image

img = Image.open("icon.png")

sizes = [16, 48, 128]

for s in sizes:
    resized = img.resize((s, s), Image.LANCZOS)
    resized.save(f"icon{s}.png")