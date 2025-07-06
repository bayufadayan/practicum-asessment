import { useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

function PDFViewer({ item, index, total, handleNext, handlePrev, updateNilai }) {
    const [inputNilai, setInputNilai] = useState(item.nilai || "");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputNilai(value);
        updateNilai(value);
    };

    return (
        <div className="border p-4 rounded shadow-md w-full">
            <h2 className="text-lg font-semibold mb-4">
                {item.npm} - {item.nama}
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* PDF VIEW */}
                <div className="flex-1">
                    {item.link ? (
                        <iframe
                            src={item.link}
                            width="100%"
                            height="600px"
                            allow="autoplay"
                            className="border rounded w-full"
                            title={`PDF-${item.npm}`}
                        ></iframe>
                    ) : (
                        <p className="text-red-500">Link PDF tidak valid.</p>
                    )}
                </div>

                {/* FORM NILAI */}
                <div className="lg:w-80 w-full flex flex-col gap-4">
                    <div>
                        <label className="block font-medium mb-1">Nilai:</label>
                        <input
                            type="text"
                            value={inputNilai}
                            onChange={handleInputChange}
                            className="border rounded px-3 py-2 w-full"
                            placeholder="Masukkan nilai..."
                        />
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handlePrev}
                            disabled={index === 0}
                            className="px-4 py-2 rounded hover:bg-white/20 disabled:opacity-50 text-white"
                        >
                            ⬅ Sebelumnya
                        </button>
                        <span className="text-sm">
                            {index + 1} / {total}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={index === total - 1}
                            className="px-4 py-2 rounded hover:bg-white/20 disabled:opacity-50"
                        >
                            Selanjutnya ➡
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PDFViewer;
