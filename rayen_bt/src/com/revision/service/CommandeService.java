package com.revision.service;

import java.util.List;

import com.revision.entities.Commande;

public interface CommandeService {
	public boolean addCommande(Commande cmd, Long idClient);
	public List<Commande> getCommandes(Long ClientId);
	public boolean updateCommande(Commande cmd);
	public boolean deleteCommande(Long id);
}
