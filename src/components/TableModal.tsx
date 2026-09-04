import { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface TableModalProps {
  onClose: () => void;
  onAddTable: (tableMarkdown: string) => void;
}

export default function TableModal({ onClose, onAddTable }: TableModalProps) {
  const [csvInput, setCsvInput] = useState('');
  const [manualMode, setManualMode] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  const generateTableFromManual = () => {
    if (rows < 1 || cols < 1) {
      toast.error('Rows and columns must be at least 1');
      return '';
    }
    let table = '|';
    for (let c = 0; c < cols; c++) table += ' Column ' + (c + 1) + ' |';
    table += '\n|';
    for (let c = 0; c < cols; c++) table += ' --- |';
    table += '\n';
    for (let r = 0; r < rows; r++) {
      table += '|';
      for (let c = 0; c < cols; c++) {
        table += ' Cell ' + (r + 1) + '-' + (c + 1) + ' |';
      }
      table += '\n';
    }
    return table;
  };

  const generateTableFromCSV = () => {
    if (!csvInput.trim()) {
      toast.error('Please paste CSV data');
      return '';
    }
    const lines = csvInput.trim().split('\n');
    if (lines.length < 2) {
      toast.error('CSV must have at least header and one data row');
      return '';
    }
    const headers = lines[0].split(',').map((h) => h.trim());
    let table = '|';
    headers.forEach((h) => (table += ' ' + h + ' |'));
    table += '\n|';
    headers.forEach(() => (table += ' --- |'));
    table += '\n';
    for (let i = 1; i < lines.length; i++) {
      const cells = lines[i].split(',').map((c) => c.trim());
      table += '|';
      cells.forEach((cell) => (table += ' ' + cell + ' |'));
      table += '\n';
    }
    return table;
  };

  const handleAdd = () => {
    const table = manualMode ? generateTableFromManual() : generateTableFromCSV();
    if (table) {
      onAddTable(table);
      toast.success('Table added');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add Table</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setManualMode(false)}
              className={`px-4 py-2 rounded-md ${!manualMode ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              From CSV
            </button>
            <button
              onClick={() => setManualMode(true)}
              className={`px-4 py-2 rounded-md ${manualMode ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              Manual
            </button>
          </div>

          {!manualMode ? (
            <textarea
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="Paste CSV data here, e.g.&#10;Name,Age,City&#10;John,30,NYC&#10;Jane,25,LA"
              rows={6}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          ) : (
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium">Rows</label>
                <input
                  type="number"
                  value={rows}
                  min={1}
                  onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                  className="mt-1 block w-24 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Columns</label>
                <input
                  type="number"
                  value={cols}
                  min={1}
                  onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                  className="mt-1 block w-24 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Add Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}