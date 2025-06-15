# 🎓 Academix – CO & PO Attainment Analysis System

**Academix** is a full-stack analytical web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) to compute and visualize **Course Outcome (CO)** and **Program Outcome (PO)** attainment based on academic performance data, in compliance with **NAAC** accreditation guidelines.

🏆 **Awarded 2nd Prize** in the *InnoQuest* competition for its innovative, scalable, and insightful academic performance analysis solution.

---

## 🚀 Key Features

* 📊 **CO & PO Attainment Calculation** based on custom CO-PO mappings and exam weightages
* 🧠 **Custom Mapping Inputs**: Faculty can define how each **CO** links to specific **POs**
* 📝 **Dynamic Data Upload**: Upload marks from exams, assignments, and internal assessments
* 🔍 **Interactive Dashboards**: Detailed analysis and visualizations for subjects, departments, and the institution
* 📄 **PDF Report Generation**: Generate downloadable NAAC-ready reports at principal level
* 🏫 **Role-based Access Control**: Teacher, HOD, and Principal with defined privileges

---

## 🧑‍💼 User Roles

### 👨‍🏫 Teacher

* Uploads student marks for assigned subjects (from exams, assignments, etc.)
* Assigns **custom weightages** to each evaluation component
* Maps each subject’s **6 COs** to relevant **POs** from the course (12 in total)
* Views detailed CO and PO attainment analysis for **their own subjects**

### 🧑‍💼 HOD (Head of Department)

* Uploads marks and manages CO-PO mapping for **department-wide subjects**
* Assigns teachers to subjects in the department
* Views analytics and attainment reports across the **entire department**

### 🧑‍🎓 Principal

* Can upload data for any subject
* Has full visibility over all classes, departments, and subjects in the institute
* Generates consolidated **PDF reports** showing CO-PO attainment for every subject and class
* Enables institution-wide analysis and report submission for **NAAC accreditation**

---

## 📚 How CO-PO Attainment is Calculated

1. **Data Upload**:

   * Teachers/HODs/Principal upload marks for **exams**, **assignments**, or **internal assessments**.
   * Each component is assigned a **custom weightage** (e.g., Midterm – 30%, Assignment – 20%, End Term – 50%).

2. **CO-PO Mapping**:

   * Each subject has 6 **Course Outcomes (COs)**.
   * Each course has 12 **Program Outcomes (POs)**.
   * Teachers provide a **matrix-style mapping** showing how each CO relates to each PO (on a scale of 1–3 or binary).

3. **Attainment Calculation**:

   * CO attainment is calculated based on the average performance of students in assessments mapped to each CO.
   * PO attainment is calculated by aggregating CO attainment values weighted by their mapping strength to each PO.

4. **Formula Reference**:

   * The calculations adhere to **NAAC Criteria 3 & 7** methodologies for computing outcome attainments.

---

## 🛠️ Tech Stack

* **Frontend**: React.js
* **Backend**: Node.js + Express.js
* **Database**: MongoDB 
* **Authentication**: Session Storage in cookies
* **File Handling**: CSV/Excel direct upload
* **Charting**: Recharts / Chart.js
* **PDF Reports**: jsPDF / Puppeteer

---

## 📸 Screenshots (Optional)

Login page:

![image](https://github.com/user-attachments/assets/db0461ba-1a92-410e-83c8-4a4ffc3d897e)

Teacher UI:

![image](https://github.com/user-attachments/assets/9d0ca1f1-0d85-4f8e-ab0b-b66ba40c95d9)
![image](https://github.com/user-attachments/assets/f678f081-53ad-4da2-8cbe-4ead55f02efc)
![image](https://github.com/user-attachments/assets/23713346-3ec1-4881-b51c-1278f1e84612)
![image](https://github.com/user-attachments/assets/68b7fdde-46fb-43b4-a079-20c54b98ab0f)

CO-PO Mapping Table:

![image](https://github.com/user-attachments/assets/19562134-92f5-4b5a-af37-0859e5295d9a)

HOD UI:
![image](https://github.com/user-attachments/assets/a25c5b31-fb45-4a81-ac2d-e9f7919a5758)
![image](https://github.com/user-attachments/assets/7571e636-31c5-4bc7-9925-e4d31c9d29b5)

Everything Else is same for HOD as for his subjects.

PRINCIPAL UI:
![image](https://github.com/user-attachments/assets/135a19ac-1781-4705-9a22-997d7d679e02)

On each Dashboard the principal will be able to see the HOD level dashbord.

On Generate Report:
![image](https://github.com/user-attachments/assets/4a4a9d4b-c288-467b-99d7-62b1df640984)

On Start new Semester the whole Database get empty and a report for the whole last semester will be created and then it will be perfect fit for next year.

![image](https://github.com/user-attachments/assets/1b8270f1-8806-4de1-ae88-156b338b13f5)

Everything Else is same for PRINCIPAL as for his subjects.

---


