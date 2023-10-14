import expect from 'chai';
import { generateCoverLetter } from '../server.js';

// dont want to add too many tests because it costs money!!
describe('Cover Letter Generation', () => {
    it('should generate a cover letter based on job description and resume', async () => {
        const jobDescription = 'Sample job description';
        const resume = 'Sample resume';
        const coverLetter = await generateCoverLetter(jobDescription, resume);
        expect(coverLetter).to.be.a('string');
    });
});