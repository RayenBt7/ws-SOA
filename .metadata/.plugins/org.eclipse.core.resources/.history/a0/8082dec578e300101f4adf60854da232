package com.revision.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Commande {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@Lob
	private String description;
	
	private float montant;
	
	@Transient
	private float totalAvecTVA;
	
	@ManyToOne
	@JoinColumn(name = "client_id", referencedColumnName = "id")
	@JsonBackReference
	private Client client;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getMontant() {
		return montant;
	}

	public void setMontant(float montant) {
		this.montant = montant;
	}

	public float getTotalAvecTVA() {
		return this.montant * 1.2f;
	}

	public void setTotalAvecTVA(float totalAvecTVA) {
		this.totalAvecTVA = totalAvecTVA;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	@Override
	public String toString() {
		return "\nCommande " + this.id + ":\n" + "\t montant: " + this.montant +  "\n\t totalAvecTVA: " + this.getTotalAvecTVA();
	}
}
