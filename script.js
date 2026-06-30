<script>
const API_KEY = "YOUR_API_KEY";

async function send() {

    const input = document.getElementById("question");
    const messages = document.getElementById("messages");

    if (input.value.trim() === "") return;

    const question = input.value;

    messages.innerHTML += `
        <div class="user">${question}</div>
    `;

    input.value = "";

    try {

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + API_KEY
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are BrightSites AI, a friendly assistant that gives accurate, creative, and educational answers."
                    },
                    {
                        role: "user",
                        content: question
                    }
                ]
            })
        });

        const data = await response.json();

        const answer =
            data.choices?.[0]?.message?.content ||
            "Sorry, I couldn't generate a response.";

        messages.innerHTML += `
            <div class="ai">${answer}</div>
        `;

        messages.scrollTop = messages.scrollHeight;

    } catch (error) {

        messages.innerHTML += `
            <div class="ai">
                Error connecting to the AI service.
            </div>
        `;

        console.error(error);
    }
}
</script>
