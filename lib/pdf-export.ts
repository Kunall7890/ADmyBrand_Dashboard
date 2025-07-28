import jsPDF from "jspdf"
import "jspdf-autotable"

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export const exportToPDF = (data: any[], filename: string, title: string) => {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text(title, 20, 20)

  // Add date
  doc.setFontSize(12)
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35)

  // Add table
  if (data.length > 0) {
    const headers = Object.keys(data[0])
    const rows = data.map((item) => Object.values(item))

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 50,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
      },
    })
  }

  doc.save(`${filename}.pdf`)
}

export const exportChartToPDF = (chartData: any, title: string) => {
  const doc = new jsPDF()

  doc.setFontSize(20)
  doc.text(title, 20, 20)

  doc.setFontSize(12)
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35)

  // Add chart data as table
  if (chartData && chartData.length > 0) {
    const headers = Object.keys(chartData[0])
    const rows = chartData.map((item: any) => Object.values(item))

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 50,
      theme: "striped",
    })
  }

  doc.save(`${title.toLowerCase().replace(/\s+/g, "-")}.pdf`)
}
