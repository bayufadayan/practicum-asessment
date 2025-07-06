"use client";
import { useEffect, useState } from "react";
import PDFViewer from "./components/PDFViewer";
import CSVUploader from "./components/CSVUploader";

function App() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🧠 Load dari localStorage saat pertama kali buka
  useEffect(() => {
    const stored = localStorage.getItem("pdf_nilai_data");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (err) {
        console.error("Data localStorage korup:", err);
        localStorage.removeItem("pdf_nilai_data");
      }
    }
  }, []);

  // 🧠 Simpan ke localStorage tiap kali data berubah
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("pdf_nilai_data", JSON.stringify(data));
    }
  }, [data]);

  const handleNext = () => {
    if (currentIndex < data.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="w-screen min-h-screen overflow-hidden">
      <div className="max-w-screen overflow-hidden p-2 md:p-8">
        <h1 className="text-xl font-bold mb-4">Aplikasi Penilaian PDF</h1>

        <CSVUploader
          setData={(newData) => {
            setData(newData);
            setCurrentIndex(0); // reset ke awal
            localStorage.setItem("pdf_nilai_data", JSON.stringify(newData)); // replace storage
          }}
        />

        {data.length > 0 && (
          <div className="mt-6 w-full">
            <PDFViewer
              item={data[currentIndex]}
              index={currentIndex}
              total={data.length}
              handleNext={handleNext}
              handlePrev={handlePrev}
              updateNilai={(nilai) => {
                const newData = [...data];
                newData[currentIndex].nilai = nilai;
                setData(newData); // auto update localStorage juga
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
