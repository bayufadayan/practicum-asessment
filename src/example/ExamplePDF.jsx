function ExamplePDF() {
    const pdfLink = "https://drive.google.com/file/d/1jGbjUR9Ej9F9vNndEU-oJK-j4dy6M7so/preview";

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Preview File PDF dari Google Drive</h2>

            <div className="w-full h-[80vh] border rounded overflow-hidden">
                <iframe
                    src={pdfLink}
                    width="100%"
                    height="100%"
                    allow="autoplay"
                    title="PDF Viewer"
                ></iframe>
            </div>
        </div>
    );
}

export default ExamplePDF;
