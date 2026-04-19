// Backend Fix - PaperSubmissionController.java

package com.saraconference.backend.controller;

import com.saraconference.backend.dto.PaperSubmissionResponse;
import com.saraconference.backend.enums.PaperStatus;
import com.saraconference.backend.service.PaperSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/papers")
@CrossOrigin(origins = {"https://saraconference2k25.netlify.app", "http://localhost:3000", "http://localhost:3001"})
public class PaperSubmissionController {

    private static final Logger logger = LoggerFactory.getLogger(PaperSubmissionController.class);

    @Autowired
    private PaperSubmissionService paperSubmissionService;

    /**
     * Test endpoint
     */
    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Paper submission API is working!");
        return ResponseEntity.ok(response);
    }

    /**
     * Submit a new paper
     * Form parameters: name, email, contactNo, department, collegeName, paperTitle, paperAbstract, paperFile
     */
    @PostMapping("/submit")
    public ResponseEntity<?> submitPaper(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("contactNo") String contactNo,
            @RequestParam("department") String department,
            @RequestParam("collegeName") String collegeName,
            @RequestParam("paperTitle") String paperTitle,
            @RequestParam("paperAbstract") String paperAbstract,
            @RequestParam("paperFile") MultipartFile paperFile) {
        try {
            logger.info("Submitting paper - Title: {}, Email: {}", paperTitle, email);
            
            PaperSubmissionResponse response = paperSubmissionService.submitPaper(
                    name, email, contactNo, department, collegeName,
                    paperTitle, paperAbstract, paperFile);
            
            logger.info("Paper submitted successfully - ID: {}", response.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error submitting paper", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Paper submission failed");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(400).body(errorResponse);
        }
    }

    /**
     * Get all papers
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllPapers() {
        try {
            List<PaperSubmissionResponse> papers = paperSubmissionService.getAllPapers();
            return ResponseEntity.ok(papers);
        } catch (Exception e) {
            logger.error("Error retrieving papers", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve papers");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    /**
     * Get paper by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getPaperById(@PathVariable String id) {
        try {
            PaperSubmissionResponse paper = paperSubmissionService.getPaperById(id);
            return ResponseEntity.ok(paper);
        } catch (Exception e) {
            logger.error("Paper not found: {}", id, e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Paper not found");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(404).body(errorResponse);
        }
    }

    @GetMapping("/evaluator/{evaluatorUsername}")
    public ResponseEntity<?> getPapersByEvaluator(
            @PathVariable String evaluatorUsername) {
        try {
            List<PaperSubmissionResponse> papers = paperSubmissionService.getPapersByEvaluatorUsername(evaluatorUsername);
            return ResponseEntity.ok(papers);
        } catch (Exception e) {
            logger.error("Error retrieving papers for evaluator", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve papers");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    /**
     * Download paper file
     */
    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadPaper(@PathVariable String id) {
        try {
            byte[] fileContent = paperSubmissionService.downloadPaper(id);
            PaperSubmissionResponse paper = paperSubmissionService.getPaperById(id);

            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=" + paper.getPaperFileName())
                    .header("Content-Type", "application/pdf")
                    .body(fileContent);
        } catch (Exception e) {
            logger.error("Error downloading paper", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Paper download failed");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(404).body(errorResponse);
        }
    }

    /**
     * Search papers by title
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchPapers(@RequestParam("query") String query) {
        try {
            List<PaperSubmissionResponse> papers = paperSubmissionService.searchPapersByTitle(query);
            return ResponseEntity.ok(papers);
        } catch (Exception e) {
            logger.error("Error searching papers", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Paper search failed");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    /**
     * Get papers by department
     */
    @GetMapping("/department/{department}")
    public ResponseEntity<?> getPapersByDepartment(@PathVariable String department) {
        try {
            List<PaperSubmissionResponse> papers = paperSubmissionService.getPapersByDepartment(department);
            return ResponseEntity.ok(papers);
        } catch (Exception e) {
            logger.error("Error retrieving papers by department", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve papers");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    /**
     * Get papers by email
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getPapersByEmail(@PathVariable String email) {
        try {
            List<PaperSubmissionResponse> papers = paperSubmissionService.getPapersByEmail(email);
            return ResponseEntity.ok(papers);
        } catch (Exception e) {
            logger.error("Error retrieving papers by email", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to retrieve papers");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    /**
     * Delete paper
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePaper(@PathVariable String id) {
        try {
            paperSubmissionService.deletePaper(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Paper deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error deleting paper", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Paper deletion failed");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(404).body(errorResponse);
        }
    }

    /**
     * Assign evaluator to a paper
     */
    @PostMapping("/{paperId}/assign-evaluator/{evaluatorId}")
    public ResponseEntity<?> assignEvaluatorToPaper(
            @PathVariable String paperId,
            @PathVariable Long evaluatorId) {
        try {
            paperSubmissionService.assignEvaluatorToPaper(paperId, evaluatorId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Evaluator assigned successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error assigning evaluator", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Evaluator assignment failed");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(400).body(errorResponse);
        }
    }

    @PatchMapping("/update-status")
    public ResponseEntity<?> updatePaperStatus(@RequestParam String paperId,
                                               @RequestParam PaperStatus status) {
        try {
            PaperSubmissionResponse updatedPaper = paperSubmissionService.updatePaperStatus(paperId, status);
            logger.debug("Updated paper status: {}", updatedPaper);
            return ResponseEntity.ok(updatedPaper);
        } catch (Exception e) {
            logger.error("Error updating paper status", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Status update failed");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(400).body(errorResponse);
        }
    }
}
