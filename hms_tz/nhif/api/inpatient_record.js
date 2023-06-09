frappe.ui.form.on('Inpatient Record', {
    reset_admission_status_to_admission_scheduled: function (frm) {
        frm.set_value("status", "Admission Scheduled")
        frm.refresh_fields("status")
        frm.save()
    },
    refresh(frm) {
        // hide button to delete rows of occupancy
        $('*[data-fieldname="inpatient_occupancies"]').find('.grid-remove-rows').hide();
        $('*[data-fieldname="inpatient_occupancies"]').find('.grid-remove-all-rows').hide();

        //hide button to delete rows of consultancy
        $('*[data-fieldname="inpatient_consultancy"]').find('.grid-remove-rows').hide();
        $('*[data-fieldname="inpatient_consultancy"]').find('.grid-remove-all-rows').hide();
    },
});

frappe.ui.form.on('Inpatient Occupancy', {
    form_render(frm, cdt, cdn) {
        frm.fields_dict.inpatient_occupancies.grid.wrapper.find('.grid-delete-row').hide();
        frm.fields_dict.inpatient_occupancies.grid.wrapper.find('.grid-duplicate-row').hide();
        frm.fields_dict.inpatient_occupancies.grid.wrapper.find('.grid-move-row').hide();
        frm.fields_dict.inpatient_occupancies.grid.wrapper.find('.grid-append-row').hide();
        frm.fields_dict.inpatient_occupancies.grid.wrapper.find('.grid-insert-row-below').hide();
        frm.fields_dict.inpatient_occupancies.grid.wrapper.find('.grid-insert-row').hide();
    },
    inpatient_occupancies_move: (frm, cdt, cdn) => {
        control_inpatient_record_move(frm, cdt, cdn);
    },
    confirmed: (frm, cdt, cdn) => {
        let row = frappe.get_doc(cdt, cdn);
        if (row.is_confirmed || !row.left) return;
        if (frm.is_dirty()) {
            frm.save();
        }
        frappe.call({
            method: 'hms_tz.nhif.api.inpatient_record.confirmed',
            args: {
                row: row,
                doc: frm.doc
            },
            callback: function (data) {
                if (data.message) {

                }
                frm.reload_doc();
            }
        });
    },
});

const control_inpatient_record_move = (frm, cdt, cdn) => {
    let row = frappe.get_doc(cdt, cdn);
    frm.reload_doc();
    frappe.throw(__(`This line should not be moved`));

};

frappe.ui.form.on('Inpatient Consultancy', {
    form_render(frm, cdt, cdn) {
        frm.fields_dict.inpatient_consultancy.grid.wrapper.find('.grid-delete-row').hide();
        frm.fields_dict.inpatient_consultancy.grid.wrapper.find('.grid-duplicate-row').hide();
        frm.fields_dict.inpatient_consultancy.grid.wrapper.find('.grid-move-row').hide();
        frm.fields_dict.inpatient_consultancy.grid.wrapper.find('.grid-append-row').hide();
        frm.fields_dict.inpatient_consultancy.grid.wrapper.find('.grid-insert-row-below').hide();
        frm.fields_dict.inpatient_consultancy.grid.wrapper.find('.grid-insert-row').hide();
    },

    confirmed: (frm, cdt, cdn) => {
        let row = frappe.get_doc(cdt, cdn);
        if (row.is_confirmed) return;
        if (frm.is_dirty()) {
            frm.save();
        }
        frappe.model.set_value(cdt, cdn, "is_confirmed", 1);
        frm.refresh_field("inpatient_consultancy");
        frm.save();
    },
});