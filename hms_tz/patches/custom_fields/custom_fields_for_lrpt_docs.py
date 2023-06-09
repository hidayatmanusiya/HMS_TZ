from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def execute():
    fields={
        "Lab Test": [
            dict(
                fieldname="hms_tz_insurance_coverage_plan",
                fieldtype="Data",
                label="Insurance Coverage Plan",
                insert_after="insurance_subscription",
                fetch_from = "insurance_subscription.healthcare_insurance_coverage_plan",
                fetch_if_empty=1,
                read_only=1
            )
        ],
        "Radiology Examination": [
            dict(
                fieldname="hms_tz_patient_age",
                fieldtype="Data",
                label="Age",
                insert_after="patient_name",
                fetch_from = "ref_docname.patient_age",
                fetch_if_empty=1,
                read_only=1
            ),
            dict(
                fieldname="hms_tz_patient_sex",
                fieldtype="Link",
                label="Gender",
                options="Gender",
                insert_after="hms_tz_patient_age",
                fetch_from = "ref_docname.patient_sex",
                fetch_if_empty=1,
                read_only=1
            ),
            dict(
                fieldname="hms_tz_insurance_coverage_plan",
                fieldtype="Data",
                label="Insurance Coverage Plan",
                insert_after="insurance_subscription",
                fetch_from = "insurance_subscription.healthcare_insurance_coverage_plan",
                fetch_if_empty=1,
                read_only=1
            )
        ],
        "Clinical Procedure": [
            dict(
                fieldname="hms_tz_insurance_coverage_plan",
                fieldtype="Data",
                label="Insurance Coverage Plan",
                insert_after="insurance_subscription",
                fetch_from = "insurance_subscription.healthcare_insurance_coverage_plan",
                fetch_if_empty=1,
                read_only=1
            )
        ],
        "Therapy Plan": [
            dict(
                fieldname="hms_tz_appointment",
                fieldtype="Link",
                label="Appointment",
                options="Patient Appointment",
                insert_after="naming_series",
                fetch_from = "ref_docname.appointment",
                fetch_if_empty=1,
                read_only=1
            ),
            dict(
                fieldname="hms_tz_patient_age",
                fieldtype="Data",
                label="Age",
                insert_after="patient_name",
                fetch_from = "ref_docname.patient_age",
                fetch_if_empty=1,
                read_only=1
            ),
            dict(
                fieldname="hms_tz_patient_sex",
                fieldtype="Link",
                label="Gender",
                options="Gender",
                insert_after="hms_tz_patient_age",
                fetch_from = "ref_docname.patient_sex",
                fetch_if_empty=1,
                read_only=1
            ),
            dict(
                fieldname="hms_tz_insurance_coverage_plan",
                fieldtype="Data",
                label="Insurance Coverage Plan",
                insert_after="hms_tz_patient_sex",
                fetch_from = "ref_docname.insurance_coverage_plan",
                fetch_if_empty=1,
                read_only=1
            ),
        ]
    }

    create_custom_fields(fields, update=True)