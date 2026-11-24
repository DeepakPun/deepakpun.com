// src/components/ResumePDF.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { resumeData } from "@/constants/resumeData";

const styles = StyleSheet.create({
    page: {
        paddingTop: 24,
        paddingBottom: 24,
        paddingHorizontal: 30,
        fontSize: 9.5,
        fontFamily: "Helvetica",
        color: "#111827",
        lineHeight: 1.32,
    },
    header: {
        borderBottom: "1.5 solid #111827",
        paddingBottom: 6,
        marginBottom: 8,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 0.5,
        marginBottom: 9,
    },
    role: {
        fontSize: 10.5,
        color: "#374151",
        marginBottom: 3,
    },
    contact: {
        fontSize: 8.8,
        color: "#4B5563",
    },
    section: {
        marginTop: 7,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: "bold",
        textTransform: "uppercase",
        borderBottom: "0.75 solid #D1D5DB",
        paddingBottom: 2,
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    skillRow: {
        flexDirection: "row",
        marginBottom: 2,
    },
    skillLabel: {
        fontWeight: "bold",
        width: 95,
    },
    skillList: {
        flex: 1,
    },
    projectBlock: {
        marginBottom: 5,
    },
    projectHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 1.5,
    },
    projectTitle: {
        fontWeight: "bold",
        fontSize: 10,
    },
    projectUrl: {
        fontSize: 8.8,
        color: "#2563EB",
    },
    bullet: {
        marginLeft: 10,
        marginBottom: 1.8,
    },
});

export function ResumePDF() {
    const { contact, skills } = resumeData;

    return (
        <Document>
            <Page size="LETTER" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{resumeData.name}</Text>
                    <Text style={styles.role}>{resumeData.title}</Text>
                    <Text style={styles.contact}>
                        {`${contact.location} • ${contact.email} • ${contact.website} • ${contact.github} • ${contact.linkedin}`}
                    </Text>
                </View>

                {/* Summary */}
                <View style={styles.section} wrap={false}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <Text>{resumeData.summary}</Text>
                </View>

                {/* Technical Skills */}
                <View style={styles.section} wrap={false}>
                    <Text style={styles.sectionTitle}>Technical Skills</Text>
                    <View style={styles.skillRow}>
                        <Text style={styles.skillLabel}>Frontend:</Text>
                        <Text style={styles.skillList}>{skills.frontend.join(", ")}</Text>
                    </View>
                    <View style={styles.skillRow}>
                        <Text style={styles.skillLabel}>Backend:</Text>
                        <Text style={styles.skillList}>{skills.backend.join(", ")}</Text>
                    </View>
                    <View style={styles.skillRow}>
                        <Text style={styles.skillLabel}>Ops & Cloud:</Text>
                        <Text style={styles.skillList}>{skills.opsAndData.join(", ")}</Text>
                    </View>
                </View>

                {/* Projects */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    {resumeData.projects.map((project, idx) => (
                        <View key={idx} style={styles.projectBlock} wrap={false}>
                            <View style={styles.projectHeader}>
                                <Text style={styles.projectTitle}>{project.name}</Text>
                                <Text style={styles.projectUrl}>{project.url}</Text>
                            </View>
                            {project.highlights.map((bullet, bIdx) => (
                                <Text key={bIdx} style={styles.bullet}>
                                    • {bullet}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>

                {/* AWS & Cloud Experience */}
                <View style={styles.section} wrap={false}>
                    <Text style={styles.sectionTitle}>AWS & Cloud Experience</Text>
                    {resumeData.cloudExperience.map((item, idx) => (
                        <Text key={idx} style={styles.bullet}>
                            • {item}
                        </Text>
                    ))}
                </View>
            </Page>
        </Document>
    );
}
