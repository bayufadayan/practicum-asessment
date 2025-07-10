import Papa from "papaparse";

function CSVUploader({ setData }) {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const isTextMiningFormat = results.meta.fields.includes("Timestamp");

                const formatted = results.data.map((row) => {
                    let email, npm, nama, kelas, tipeSoal, link, isTextMining;

                    if (isTextMiningFormat) {
                        // Format Text Mining
                        const fileIdMatch = row["Upload Jawaban (dalam bentuk PDF)"]?.match(/id=([a-zA-Z0-9-_]+)/);
                        const fileId = fileIdMatch ? fileIdMatch[1] : null;

                        email = row["Email address"];
                        npm = row["NPM"];
                        nama = row["Nama Mahasiswa"];
                        kelas = row["Kelas"];
                        tipeSoal = row["Timestamp"]; // disamain aja key-nya
                        link = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
                        isTextMining = true;
                    } else {
                        // Format UTP
                        const fileIdMatch = row["File jawaban, format :  NPM_NAMA_UTPOPT.pdf"]?.match(/id=([a-zA-Z0-9-_]+)/);
                        const fileId = fileIdMatch ? fileIdMatch[1] : null;

                        email = row["Email address"];
                        npm = row["NPM"];
                        nama = row["Nama"];
                        kelas = row["Kelas"];
                        tipeSoal = row["Tipe Soal (sesuai digit terakhir NPM)"];
                        link = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
                        isTextMining = false;
                    }

                    return {
                        email,
                        npm,
                        nama,
                        kelas,
                        tipeSoal,
                        link,
                        nilai: null,
                        isTextMining,
                    };
                });

                setData(formatted);
            },
        });
    };

    return (
        <div>
            <label className="font-medium w-full">Upload file CSV:</label>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="block mt-2" />
        </div>
    );
}

export default CSVUploader;
