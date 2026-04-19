# Paper Submission API Integration

## Backend Endpoints Integrated

All endpoints from `PaperSubmissionController` have been integrated into the frontend:

### API Client Methods (lib/api.ts)

1. **submitPaper(formData: FormData)** - POST /papers/submit
   - Submits a new paper with file upload
   - Used in: Upload Paper page

2. **getPapersByEmail(email: string)** - GET /papers/email/{email}
   - Fetches papers by author email
   - Used in: My Papers page (auto-loaded on mount)

3. **getAllPapers()** - GET /papers/all
   - Fetches all papers in the system
   - Available for evaluator view

4. **getPaperById(id: string)** - GET /papers/{id}
   - Fetches a specific paper by ID

5. **getPapersByDepartment(department: string)** - GET /papers/department/{department}
   - Fetches papers filtered by department

6. **searchPapers(query: string)** - GET /papers/search
   - Searches papers by title

7. **deletePaper(id: string)** - DELETE /papers/{id}
   - Deletes a paper

8. **updatePaperStatus(paperId: string, status: string)** - PATCH /papers/update-status
   - Updates paper status (submitted, under_review, accepted, rejected)

9. **downloadPaper(id: string)** - GET /papers/download/{id}
   - Downloads paper file as blob

## Page Integrations

### Upload Paper Page (`app/dashboard/upload/page.tsx`)
- ✅ Form submission integrated with backend
- ✅ Validates file type and size
- ✅ Submits paper data along with file
- ✅ Displays success/error messages
- ✅ Auto-redirects to My Papers on success
- ⚠️ TODO: Add contact number field
- ⚠️ TODO: Add college name field

### My Papers Page (`app/dashboard/my-papers/page.tsx`)
- ✅ Fetches papers from backend on page load
- ✅ Shows loading state while fetching
- ✅ Shows error state with error message
- ✅ Shows empty state when no papers
- ✅ Displays papers with status badges
- ✅ Filters by paper status

### Dashboard Page (`app/dashboard/page.tsx`)
- ✅ User data from auth context
- ✅ Paper stats display (ready for backend integration)

## Data Structure

### PaperSubmissionResponse
```typescript
{
  id: string;
  name: string;
  email: string;
  contactNo: string;
  department: string;
  collegeName: string;
  paperTitle: string;
  paperAbstract: string;
  paperFileName: string;
  status?: string;
  submittedDate?: string;
  evaluatorUsername?: string;
}
```

## Features Implemented

✅ Single fetch on login (user data)
✅ Consistent headers across all pages
✅ Dynamic user name/initials display
✅ Paper submission with file upload
✅ Paper list with backend data
✅ Loading and error states
✅ Empty state handling
✅ Status filtering
✅ Paper search ready
✅ Auto-logout on invalid token

## Next Steps

1. Test paper submission with real files
2. Add contact number and college name fields to upload form
3. Implement paper download functionality
4. Add paper status update for evaluators
5. Implement paper evaluation/feedback features
