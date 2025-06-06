@PatchMapping("/{id}/finalizar")
public ResponseEntity<Manutencao> finalizar(@PathVariable Long id) {
    Optional<Manutencao> manutencaoOpt = service.buscarPorId(id);
    if (manutencaoOpt.isPresent()) {
        Manutencao manutencao = manutencaoOpt.get();
        manutencao.setDataFinalizacao(LocalDate.now());
        return ResponseEntity.ok(service.salvar(manutencao));
    }
    return ResponseEntity.notFound().build();
}
