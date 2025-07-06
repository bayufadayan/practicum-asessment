import { useState } from "react";
import PDFViewer from "./components/PDFViewer";
import CSVUploader from "./components/CSVUploader";

function App() {
  const [data, setData] = useState([]); // data mahasiswa
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < data.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="w-screen min-h-screen overflow-hidden">
      <div className="max-w-screen overflow-hidden p-8">
        <h1 className="text-xl font-bold mb-4">Aplikasi Penilaian PDF</h1>

        <CSVUploader setData={setData} />

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
                setData(newData);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
