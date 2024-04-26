export async function getPhoto(PhotoId: number): Promise<string> {
    const response = await fetch("http://localhost:8080/photo", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({PhotoID:PhotoId})
    });
    return response.json();
}