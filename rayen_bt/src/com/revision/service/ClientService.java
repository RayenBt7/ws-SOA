package com.revision.service;

import java.util.List;
import java.util.Map;

import com.revision.entities.Client;

public interface ClientService {
	public Map<String, String> addClient(Client cl);
	public Client getClientById(Long clientId);
	public List<Client> getAllClients();
	public List<Client> searchClientsByName(String nom);
	public Map<String, String> updateClient(Client cl);
	public Map<String, String> deleteClient(Long clientId);
}
