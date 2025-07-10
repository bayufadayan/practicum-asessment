"use client";
import { useEffect, useState } from "react";
import PDFViewer from "../components/PDFViewer";
import CSVUploader from "../components/CSVUploader";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function TextMiningPage() {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 🧠 Load dari localStorage saat pertama kali buka
    useEffect(() => {
        const stored = localStorage.getItem("nilai_tm");
        if (stored) {
            try {
                setData(JSON.parse(stored));
            } catch (err) {
                console.error("Data localStorage korup:", err);
                localStorage.removeItem("nilai_tm");
            }
        }
    }, []);

    // 🧠 Simpan ke localStorage tiap kali data berubah
    useEffect(() => {
        if (data.length > 0) {
            localStorage.setItem("nilai_tm", JSON.stringify(data));
        }
    }, [data]);

    const handleNext = () => {
        if (currentIndex < data.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Rekap Nilai Text Mining", 14, 20);

        const tableData = data.map((item, index) => [
            index + 1,
            item.npm,
            item.nama,
            item.kelas,
            item.nilai || "Belum dinilai",
        ]);

        autoTable(doc, {
            startY: 30,
            head: [["No", "NPM", "Nama", "Kelas", "Nilai"]],
            body: tableData,
        });

        doc.save("nilai-tm.pdf");
    };

    return (
        <div className="w-screen min-h-screen overflow-hidden">
            <div className="max-w-screen overflow-hidden p-2 md:p-8">
                <h1 className="text-xl font-bold mb-4">Aplikasi Penilaian PDF (TEXT MINING)</h1>

                <details className="mb-4 w-full bg-white/10 rounded-md p-4">
                    <summary className="cursor-pointer font-semibold text-base hover:underline">
                        📄 Format Upload File (Klik untuk lihat detail)
                    </summary>
                    <ul className="mt-2 list-disc pl-6 text-sm text-white/90">
                        <li>Timeststamp</li>
                        <li>Email address</li>
                        <li>Nama Mahasiswa</li>
                        <li>NPM</li>
                        <li>Kelas</li>
                        <li>
                            <span className="italic">
                                Upload Jawaban (dalam bentuk PDF)
                            </span>
                        </li>
                    </ul>
                </details>

                <div className="flex justify-between">
                    <CSVUploader
                        setData={(newData) => {
                            setData(newData);
                            setCurrentIndex(0);
                            localStorage.setItem("nilai_tm", JSON.stringify(newData)); // replace storage
                        }}
                    />

                    {data.length > 0 && (
                        <button
                            onClick={handleExportPDF}
                            className="mt-4 mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Export PDF
                        </button>
                    )}
                </div>


                {data.length > 0 && (
                    <div className="mt-0 w-full">
                        <PDFViewer
                            item={data[currentIndex]}
                            index={currentIndex}
                            total={data.length}
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            updateNilai={(nilai) => {
                                const newData = [...data];
                                newData[currentIndex].nilai = nilai;
                                setData(newData);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default TextMiningPage;
