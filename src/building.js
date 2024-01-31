/* class containing our score and cost */
class Building {
    constructor(
        score,
        fishermenCost,
        fishermenPurchased,
        fishNetCost,
        fishNetPurchased,
        fishCorpCost,
        fishCorpPurchased
    ) {
        this.score = score;
        this.fishermenCost = fishermenCost;
        this.fishermenPurchased = fishermenPurchased;
        this.fishNetCost = fishNetCost;
        this.fishNetPurchased = fishNetPurchased;
        this.fishCorpCost = fishCorpCost;
        this.fishCorpPurchased = fishCorpPurchased;
    }

    /* Update the button to disable on price amount required as well as keep track of score*/
    update() {
        document.getElementById('score').textContent = ` ${this.score}`;

        if (this.score >= this.fishermenCost) {
            document.getElementById('fishermen').disabled = false;
        } else {
            document.getElementById('fishermen').disabled = true;
        }

        if (this.score >= this.fishNetCost) {
            document.getElementById('fishNet').disabled = false;
        } else {
            document.getElementById('fishNet').disabled = true;
        }

        if (this.score >= this.fishCorpCost) {
            document.getElementById('fishCorp').disabled = false;
        } else {
            document.getElementById('fishCorp').disabled = true;
        }
    }
}
