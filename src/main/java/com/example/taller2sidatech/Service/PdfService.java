package com.example.taller2sidatech.Service;

import com.example.taller2sidatech.Model.Entity.Compra;
import com.example.taller2sidatech.Model.Entity.DetalleCompra;
import com.example.taller2sidatech.Model.Entity.Usuario;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class PdfService {

    public byte[] generateInvoice(Compra compra, Usuario usuario) throws DocumentException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, outputStream);

        document.open();

        // Logo and header
        addHeaderAndLogo(document);

        // Invoice details
        addInvoiceDetails(document, compra);

        // Customer info
        addCustomerInfo(document, usuario);

        // Items table
        addItemsTable(document, compra);

        // Total amount
        addTotalAmount(document, compra);

        // Footer
        addFooter(document);

        document.close();
        return outputStream.toByteArray();
    }

    private void addHeaderAndLogo(Document document) throws DocumentException {
        Paragraph header = new Paragraph("SidaTech Shop", new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, BaseColor.DARK_GRAY));
        header.setAlignment(Element.ALIGN_CENTER);
        document.add(header);

        Paragraph subheader = new Paragraph("FACTURA", new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD, BaseColor.DARK_GRAY));
        subheader.setAlignment(Element.ALIGN_CENTER);
        document.add(subheader);

        document.add(Chunk.NEWLINE);
    }

    private void addInvoiceDetails(Document document, Compra compra) throws DocumentException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);

        // Invoice number
        table.addCell(createCell("No. de Factura:", Font.BOLD));
        table.addCell(createCell(compra.getNumero(), Font.NORMAL));

        // Invoice date
        table.addCell(createCell("Fecha:", Font.BOLD));
        table.addCell(createCell(dateFormat.format(compra.getFechaCreacion()), Font.NORMAL));

        document.add(table);
        document.add(Chunk.NEWLINE);
    }

    private void addCustomerInfo(Document document, Usuario usuario) throws DocumentException {
        Paragraph customerHeader = new Paragraph("DATOS DEL CLIENTE", new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD));
        document.add(customerHeader);

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);

        // Customer name
        table.addCell(createCell("Nombre:", Font.BOLD));
        table.addCell(createCell(usuario.getNombre(), Font.NORMAL));

        // Customer email
        table.addCell(createCell("Email:", Font.BOLD));
        table.addCell(createCell(usuario.getEmail(), Font.NORMAL));

        // Customer address
        table.addCell(createCell("Dirección:", Font.BOLD));
        table.addCell(createCell(usuario.getDireccion(), Font.NORMAL));

        document.add(table);
        document.add(Chunk.NEWLINE);
    }

    private void addItemsTable(Document document, Compra compra) throws DocumentException {
        Paragraph itemsHeader = new Paragraph("PRODUCTOS", new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD));
        document.add(itemsHeader);

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);

        // Table header
        table.addCell(createHeaderCell("Producto"));
        table.addCell(createHeaderCell("Precio"));
        table.addCell(createHeaderCell("Cantidad"));
        table.addCell(createHeaderCell("Total"));

        // Table items
        for (DetalleCompra detalle : compra.getDetalleCompras()) {
            table.addCell(createCell(detalle.getNombre(), Font.NORMAL));
            table.addCell(createCell("COP $" + formatNumber(detalle.getPrecio()), Font.NORMAL));
            table.addCell(createCell(String.valueOf(detalle.getCantidad()), Font.NORMAL));
            table.addCell(createCell("COP $" + formatNumber(detalle.getTotal()), Font.NORMAL));
        }

        document.add(table);
        document.add(Chunk.NEWLINE);
    }

    private void addTotalAmount(Document document, Compra compra) throws DocumentException {
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(40);
        table.setHorizontalAlignment(Element.ALIGN_RIGHT);

        table.addCell(createCell("TOTAL:", Font.BOLD));
        table.addCell(createCell("COP $" + formatNumber(compra.getTotal()), Font.BOLD));

        document.add(table);
        document.add(Chunk.NEWLINE);
    }

    private void addFooter(Document document) throws DocumentException {
        Paragraph footer = new Paragraph("Gracias por su compra", new Font(Font.FontFamily.HELVETICA, 10, Font.ITALIC));
        footer.setAlignment(Element.ALIGN_CENTER);
        document.add(footer);

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Paragraph timestamp = new Paragraph("Generado el: " + dateFormat.format(new Date()),
                new Font(Font.FontFamily.HELVETICA, 8, Font.NORMAL, BaseColor.GRAY));
        timestamp.setAlignment(Element.ALIGN_CENTER);
        document.add(timestamp);
    }

    private PdfPCell createCell(String content, int fontStyle) {
        PdfPCell cell = new PdfPCell(new Phrase(content,
                new Font(Font.FontFamily.HELVETICA, 10, fontStyle)));
        cell.setPadding(5);
        cell.setBorderWidth(0.5f);
        return cell;
    }

    private PdfPCell createHeaderCell(String content) {
        PdfPCell cell = new PdfPCell(new Phrase(content,
                new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.WHITE)));
        cell.setBackgroundColor(BaseColor.DARK_GRAY);
        cell.setPadding(5);
        return cell;
    }

    private String formatNumber(double number) {
        return String.format("%,.0f", number);
    }
}